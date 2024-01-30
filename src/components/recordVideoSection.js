'use client'
import VideoIcon from "../components/assets/videoIcon";
import NoVideoIcon from "../components/assets/noVideoIcon";
import DownloadIcon from "../components/assets/downloadIcon";
import UploadIcon from "../components/assets/uploadIcon";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from 'react';
import Lottie from "lottie-react"
import uploadAnimation from "../components/assets/uploadAnimation"

export default function RecordVideoSection() {

    const video = useRef(null);
    const videoRecording = useRef(null);
    const videoParts = useRef([]);
    const timerIntervalId = useRef(null);
    const router = useRouter();



    const [timer, setTimer] = useState(0);
    const [recording, setRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const startCamera = () => {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
                video.current.srcObject = stream;
            });
        };

        startCamera();
    }, []);

    const startRecording = () => {
        videoRecording.current = new MediaRecorder(video.current.srcObject);
        videoRecording.current.start(1000);
        videoRecording.current.ondataavailable = function (e) {
            videoParts.current.push(e.data);
        };

        setRecording(true);

        // Start the timer
        timerIntervalId.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    };

    const stopRecording = () => {
        videoRecording.current.stop();

        // Clear the timer interval
        clearInterval(timerIntervalId.current);

        setRecording(false);
        setTimer(0);
    };

    const downloadVideo = () => {
        const blob = new Blob(videoParts.current, {
            type: 'video/webm',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = 'videoRecorded.webm';
        a.click();
    };



    async function uploadVideo() {

        const blob = new Blob(videoParts.current, {
            type: 'video/webm',
        });

        // Create a FormData object and append the blob to it
        const formData = new FormData();
        formData.append('file', blob, 'videoRecorded.webm');

        console.log('Uploading File');

        setIsUploading(true);

        try {
            // POST request using axios
            const res = await axios.postForm('/api/upload', formData);

            setIsUploading(false);

            const newName = res.data.uniqueName;

            router.push('/' + newName);

            // Optionally update the UI or perform other actions on successful upload
        } catch (error) {
            // Handle errors
            console.error('Error uploading video:', error);
        } 
      
    }



    return (
        <div className="flex flex-col items-center mt-3">
            <video ref={video} autoPlay className=" w-[340px] h-[580px] object-cover mb-3 rounded-xl shadow-md shadow-md shadow-cyan-500"></video>

            {videoParts.current.length === 0 && !recording && (
                <label
                    onClick={startRecording}
                    className="cursor-pointer inline-flex items-center justify-center bg-white hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3"
                >
                    <VideoIcon />
                    <span>Start Recording</span>
                </label>
            )}

            {recording && (
                <label
                    onClick={stopRecording}
                    className="cursor-pointer inline-flex items-center justify-center bg-white hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3"
                >
                    <NoVideoIcon />
                    <span>{`Stop Recording: ${timer}s`}</span>
                </label>
            )}

            {videoParts.current.length > 0 && !recording && (
                <div className="flex flex-col items-center justify-between">
                    <label
                        onClick={startRecording}
                        className="cursor-pointer inline-flex items-center justify-center bg-white hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3 mb-2"
                    >
                        <VideoIcon />
                        <span>Start Recording</span>
                    </label>

                    <label
                        onClick={uploadVideo}
                        className="cursor-pointer inline-flex items-center justify-center bg-white hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3 mb-2"
                    >
                        <UploadIcon />
                        <span>Upload Recording</span>
                    </label>


                    <label
                        onClick={downloadVideo}
                        className="cursor-pointer inline-flex items-center justify-center bg-white hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3"
                    >
                        <DownloadIcon />
                        <span>Download Recording</span>
                    </label>

                </div>
            )}

            {isUploading && (
                <div className="z-50 bg-black/80 text-white fixed inset-0 flex items-center justify-center">
                    <div className="text-center flex flex-col items-center">
                        <h2 className="text-4xl mb-2">Uploading...</h2>
                        <div style={{ marginTop: '-70px' }}>
                            <Lottie animationData={uploadAnimation} />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );


}


