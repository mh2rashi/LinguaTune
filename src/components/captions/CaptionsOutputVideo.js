import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useEffect, useState, useRef } from "react";
import roboto from '../../fonts/Roboto-Regular.ttf';
import robotoBold from '../../fonts/Roboto-Bold.ttf';
import noto from '../../fonts/NotoSans-Regular.ttf';


const CaptionsOutputVideo = ({ filename, transcriptionItems, primaryColor, outlineColor, isButtonClicked, resetButtonClicked }) => {
    const videoUrl = "https://transalte-transcribe.s3.amazonaws.com/" + filename;
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

            transcode(primaryColor, outlineColor);
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
        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        await ffmpeg.writeFile('/tmp/notosans-regular.ttf', await fetchFile(noto));

        setLoaded(true);
    }

    function secondsToHHMMSSMS(timeString) {
        const d = new Date(parseFloat(timeString) * 1000);
        return d.toISOString().slice(11, 23).replace('.', ',');
    }

    function transcriptionItemsToSrt(items) {
        let srt = '';
        let i = 1;
        items.filter(item => !!item).forEach(item => {
            // seq
            srt += i + "\n";
            // timestamps
            const { start_time, end_time } = item; // 52.345
            srt += secondsToHHMMSSMS(start_time)
                + ' --> '
                + secondsToHHMMSSMS(end_time)
                + "\n";

            // content
            srt += item.content + "\n";
            srt += "\n";
            i++;
        });
        return srt;
    }

    function toFFmpegColor(rgb) {
        const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
        return '&H' + bgr + '&';
    }

    async function transcode(primaryColor, outlineColor) {
        const ffmpeg = ffmpegRef.current;
        const srt = transcriptionItemsToSrt(transcriptionItems);
        await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
        await ffmpeg.writeFile('subs.srt', srt);
        videoRef.current.src = videoUrl;
        await new Promise((resolve, reject) => {
            videoRef.current.onloadedmetadata = resolve;
        });
        const duration = videoRef.current.duration;
        ffmpeg.on('log', ({ message }) => {
            const regexResult = /time=([0-9:.]+)/.exec(message);
            if (regexResult && regexResult?.[1]) {
                const howMuchIsDone = regexResult?.[1];
                const [hours, minutes, seconds] = howMuchIsDone.split(':');
                const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
                const videoProgress = doneTotalSeconds / duration;
                setProgress(videoProgress);
            }
        })
        await ffmpeg.exec([
            '-ss', '0',
            '-t', '5', 
            '-i', filename,
            '-preset', 'ultrafast',
            '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto,MarginV=25,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
            'output.mp4'
        ]);
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

export default CaptionsOutputVideo
