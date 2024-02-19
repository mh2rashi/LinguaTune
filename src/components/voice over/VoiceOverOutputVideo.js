import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useEffect, useState, useRef } from "react";
import { createFFmpeg } from '@ffmpeg/ffmpeg';



const VoiceOverOutputVideo = ({ filename, audioFile, isApplyVoiceOverClicked, resetApplyVoiceOverClicked }) => {
    const videoUrl = "https://" + process.env.BUCKET_NAME + ".s3.us-east-2.amazonaws.com/" + filename;
    const mp3Url = "https://" + process.env.BUCKET_NAME + ".s3.us-east-2.amazonaws.com/" + audioFile;
     const mp3Url = "https://transalte-transcribe.s3.us-east-2.amazonaws.com/6e13c702-e850-4269-b8b2-8efcb51d9b76.mp3";
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


    async function transcode() {

       const ffmpeg = ffmpegRef.current;

       // Write the video file
       console.log('videoUrl:', videoUrl);
       await ffmpeg.writeFile(filename, await fetchFile(videoUrl));

       console.log('mp3Url:',mp3Url);
    //    const audioData = await fetch(mp3Url).then(response => response.arrayBuffer());
       await ffmpeg.writeFile('audio.mp3', await fetch(mp3Url));

       // Set the video file as input
       await ffmpeg.input(filename);
       await ffmpeg.input('audio.mp3').audioCodec('aac');

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
           '-i', filename,           // Input video file
           '-i', 'audio.mp3',        // Input audio file
           '-c:v', 'copy',           // Copy video codec
           '-c:a', 'aac',            // Set audio codec to AAC
           '-strict', 'experimental',
           'output.mp4'               // Output file
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

export default VoiceOverOutputVideo