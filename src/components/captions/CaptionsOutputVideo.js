/**
 * The below code is a React component that renders a video with captions based on a given
 * transcription.
 * @returns The component `CaptionsOutputVideo` is being returned.
**/

// Import FFmpeg and related utilities
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

// Import React hooks
import { useEffect, useState, useRef } from "react";

// Import transcription helpers
import { transcriptionItemsToSrt, toFFmpegColor } from "../../app/api/transcription/transcriptionHelpers";

// Component to render the video with captions
const CaptionsOutputVideo = ({ filename, transcriptionItems, primaryColor, outlineColor, isButtonClicked, resetButtonClicked }) => {
    // Construct the URL of the video
    const videoUrl = "https://" + process.env.BUCKET_NAME + ".s3.amazonaws.com/" + filename;

    // States to manage component loading and progress
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(1);

    // Refs to store the FFmpeg instance and the video element
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);

    // Load FFmpeg and required files on component mount
    useEffect(() => {
        videoRef.current.src = videoUrl;
        loadFFmpeg();
    }, []);

    // Transcode video when the button is clicked
    useEffect(() => {
        if (isButtonClicked) {
            transcode(primaryColor, outlineColor);
            resetButtonClicked(false);
        }
    }, [isButtonClicked]);

    // Load FFmpeg and required font files
    const loadFFmpeg = async () => {
        const ffmpeg = ffmpegRef.current;
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

        // Load FFmpeg core and WASM files
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });

        // Load custom font file
        await ffmpeg.writeFile('/tmp/arial.ttf', await fetchFile('https://raw.githubusercontent.com/kavin808/arial.ttf/master/arial.ttf'));

        setLoaded(true);
    };

    // Transcode video and add captions
    async function transcode(primaryColor, outlineColor) {
        const ffmpeg = ffmpegRef.current;
        const srt = transcriptionItemsToSrt(transcriptionItems);

        // Write video file and subtitles file
        await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
        await ffmpeg.writeFile('subs.srt', srt);

        // Set video source and wait for metadata to be loaded
        videoRef.current.src = videoUrl;
        await new Promise((resolve, reject) => {
            videoRef.current.onloadedmetadata = resolve;
        });
        const duration = videoRef.current.duration;

        // Update progress based on FFmpeg log
        ffmpeg.on('log', ({ message }) => {
            const regexResult = /time=([0-9:.]+)/.exec(message);
            if (regexResult && regexResult?.[1]) {
                const howMuchIsDone = regexResult?.[1];
                const [hours, minutes, seconds] = howMuchIsDone.split(':');
                const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
                const videoProgress = doneTotalSeconds / duration;
                setProgress(videoProgress);
            }
        });

        // Execute FFmpeg command to add captions to the video
        await ffmpeg.exec([
            '-ss', '0',
            '-i', filename,
            '-preset', 'ultrafast',
            '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=arial,MarginV=20,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
            'output.mp4'
        ]);

        // Read the transcoded video file and set the video source
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));

        // Reset progress to 100%
        setProgress(1);
    }

    return (
        <div className="bg-gray-800 rounded-xl shadow-md shadow-cyan-500 flex-1  overflow-hidden relative">
            {progress && progress < 1 && (
                <div className="absolute inset-0 bg-black/80 flex items-center">
                    <div className="w-full text-center">
                        <div className="bg-bg-gradient-from/50 mx-8 rounded-lg overflow-hidden relative">
                            <div
                                className="bg-bg-gradient-from h-8"
                                style={{ width: progress * 100 + '%' }}
                            >
                                <h3 className="text-white text-xl absolute inset-0 py-1">
                                    {parseInt(progress * 100)}%
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <video
                data-video={0}
                ref={videoRef}
                controls
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: '100%',
                    height: '100%',
                }}
            ></video>
        </div>
    );
};

export default CaptionsOutputVideo;
