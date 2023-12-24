import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useEffect, useState, useRef } from "react";



const VoiceOverOutputVideo = ({ filename, audioFile, isApplyVoiceOverClicked, resetApplyVoiceOverClicked }) => {
    const videoUrl = "https://transalte-transcribe.s3.amazonaws.com/" + filename;
    const mp3Url = "https://transalte-transcribe.s3.amazonaws.com/" + audioFile;
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(1);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);


    useEffect(() => {
        videoRef.current.src = videoUrl;
        load();
    }, []);

    useEffect(() => {

        if (isButtonClicked) {

            transcode();
            resetButtonClicked(false);

        };

    }, [isButtonClicked]);

    const load = async () => {
        const ffmpeg = ffmpegRef.current;
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd'
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });

        setLoaded(true);
    }


    async function transcode() {
        const ffmpeg = ffmpegRef.current;

        // Write the audio file to be applied
        await ffmpeg.writeFile('audio.mp3', await fetchFile(mp3Url));

        // Write the video file and subtitles
        await ffmpeg.writeFile(filename, await fetchFile(videoUrl));

        // Set the video file as input
        await ffmpeg.input(filename);

        // Set the audio file as input and specify audio codec
        await ffmpeg.input('audio.mp3').audioCodec('aac');

        // Other commands
        await ffmpeg
            .inputOptions(['-ss', '0'])
            .outputOptions(['-preset', 'ultrafast'])
            .complexFilter([
                `[0:v]subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto,MarginV=25,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'[v]`,
                '[v]copy[outv]',
                '[1:a]ac[aud]'
            ])
            .output('output.mp4')
            .on('progress', (progress) => {
                // Handle progress updates
                const videoProgress = progress.percent / 100;
                setProgress(videoProgress);
            });

        // Execute the command
        await ffmpeg.run();

        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src =
            URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
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
                    maxWidth: '100%', // Set maximum width to 100%
                    maxHeight: '100%', // Set maximum height to 100%
                    width: '100%', // Take the full available width within the div
                    height: '100%', // Take the full available height within the div
                }}
            ></video>
        </div>


    );

};

export default VoiceOverOutputVideo