import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useEffect, useState, useRef } from "react";
import { createFFmpeg } from '@ffmpeg/ffmpeg';



const VoiceOverOutputVideo = ({ filename, audioFile, isApplyVoiceOverClicked, resetApplyVoiceOverClicked }) => {
    const videoUrl = "https://transalte-transcribe.s3.us-east-2.amazonaws.com/" + filename;
    //const mp3Url = "https://transalte-transcribe.s3.amazonaws.com/" + "81a10dc5-65fb-41d4-ae90-2f3c95f0ce6e.mp3";
    const mp3Url = "https://transalte-transcribe.s3.us-east-2.amazonaws.com/81a10dc5-65fb-41d4-ae90-2f3c95f0ce6e.mp3";
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(1);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);


    useEffect(() => {
        videoRef.current.src = videoUrl;
        load();
    }, []);

    useEffect(() => {

        if (isApplyVoiceOverClicked) {

            transcode();
            resetApplyVoiceOverClicked(false);

        };

    }, [isApplyVoiceOverClicked]);

    const load = async () => {
        const ffmpeg = ffmpegRef.current;
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd'
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });

        setLoaded(true);
    };


    //async function transcode() {
    //    const ffmpeg = ffmpegRef.current;

    //    console.log(filename);
    //    const audioData = await fetch(mp3Url).then(response => response.arrayBuffer());
    //    await ffmpeg.writeFile('81a10dc5 - 65fb - 41d4 - ae90 - 2f3c95f0ce6e.mp3', audioData);

    //    // Write the video file
    //    const videoData = await fetch(videoUrl).then(response => response.arrayBuffer())
    //    await ffmpeg.writeFile(filename, videoData);

    //    // Set the video file as input
    //    await ffmpeg.input(filename);
    //    await ffmpeg.input('81a10dc5-65fb-41d4-ae90-2f3c95f0ce6e.mp3').audioCodec('aac');

    //    await new Promise((resolve, reject) => {
    //        videoRef.current.onloadedmetadata = resolve;
    //    });
    //    const duration = videoRef.current.duration;
    //    ffmpeg.on('log', ({ message }) => {
    //        const regexResult = /time=([0-9:.]+)/.exec(message);
    //        if (regexResult && regexResult?.[1]) {
    //            const howMuchIsDone = regexResult?.[1];
    //            const [hours, minutes, seconds] = howMuchIsDone.split(':');
    //            const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
    //            const videoProgress = doneTotalSeconds / duration;
    //            setProgress(videoProgress);
    //        }
    //    })


    //    await ffmpeg.exec([
    //        '-i', filename,           // Input video file
    //        '-i', '81a10dc5-65fb-41d4-ae90-2f3c95f0ce6e.mp3',        // Input audio file
    //        '-c:v', 'copy',           // Copy video codec
    //        '-c:a', 'aac',            // Set audio codec to AAC
    //        '-strict', 'experimental',
    //        'output.mp4'               // Output file
    //    ]);

    //    const data = await ffmpeg.readFile('output.mp4');
    //    videoRef.current.src =
    //        URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    //    setProgress(1);


    //}

    async function transcode() {

        const ffmpeg = ffmpegRef.current;

        // Load ffmpeg
        await ffmpeg.load();

        // Fetch and write the audio file
        const audioBuffer = await fetch(mp3Url).then(response => response.arrayBuffer());
        console.log('audio console', audioBuffer);
        await ffmpeg.writeFile('audio.mp3', audioBuffer);


        // Fetch and write the video file
        const videoData = await fetchFile(videoUrl);
        console.log('video console', videoData);
        await ffmpeg.writeFile(filename, videoBuffer);

        //// Set inputs
        //await ffmpeg.input('input.mp4');
        //await ffmpeg.input('audio.mp3').audioCodec('aac');

        //// Set progress update callback
        //const duration = videoRef.current.duration;
        //ffmpeg.setProgress(({ ratio }) => {
        //    const doneTotalSeconds = duration * ratio;
        //    const videoProgress = doneTotalSeconds / duration;
        //    setProgress(videoProgress);
        //});

        //// Run ffmpeg command
        //await ffmpeg.run(
        //    '-c:v', 'copy',
        //    '-c:a', 'aac',
        //    '-strict', 'experimental',
        //    'output.mp4'
        //);

        //// Read and display the output video
        //const data = ffmpeg.read('output.mp4');
        //videoRef.current.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        //setProgress(1);
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