/**
 * The `RecordVideoSection` function is a React component that allows users to record and upload videos
 * using the device's camera.
 * @returns The component is returning the user interface for recording and managing videos.
 * The returned components includes a video element for displaying the camera feed, buttons
 * for starting and stopping video recording, buttons for uploading and downloading recorded videos,
 * and an uploading animation that is displayed when a video is being uploaded.
**/

'use client'

// React imports
import React, { useEffect, useRef, useState } from 'react';

// Import for HTTP requests and routing
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Animation imports
import Lottie from 'lottie-react';
import uploadAnimation from '../../assets/animations/uploadAnimation';

// Icon imports
import {
VideoIcon,
UploadIcon,
DownloadIcon,
NoVideoIcon
} from '../../assets/icons';

export default function RecordVideoSection() {

    // Define references for video and its recording, array to store recorded parts, and timer interval id
    const video = useRef(null);
    const videoRecording = useRef(null);
    const videoParts = useRef([]);
    const timerIntervalId = useRef(null);

    // Get router instance
    const router = useRouter();

    // Define states for timer, recording state, and uploading state
    const [timer, setTimer] = useState(0);
    const [recording, setRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Effect hook to start camera when component mounts
    useEffect(() => {
        const startCamera = () => {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
                video.current.srcObject = stream;
            });
        };

        startCamera();
    }, []);

    // Function to start video recording
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

    // Function to stop video recording
    const stopRecording = () => {
        videoRecording.current.stop();

        // Clear the timer interval
        clearInterval(timerIntervalId.current);

        setRecording(false);
        setTimer(0);
    };

    // Function to download recorded video
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

    // Function to upload recorded video
    async function uploadVideo() {
        const blob = new Blob(videoParts.current, {
            type: 'video/webm',
        });

        // Create a FormData object and append the blob to it
        const formData = new FormData();
        formData.append('file', blob, 'videoRecorded.webm');

        // Set uploading state to true
        setIsUploading(true);

        try {
            // POST request using axios to upload the video
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

    // Return the JSX for the component
    return (
        <div className="flex flex-col items-center mt-3">
            <video ref={video} autoPlay className="w-[340px] h-[580px] object-cover mb-3 rounded-xl shadow-md shadow-md shadow-cyan-500"></video>

            {/* Start Recording Button */}
            {videoParts.current.length === 0 && !recording && (
                <label
                    onClick={startRecording}
                    className="cursor-pointer inline-flex items-center justify-center bg-black hover:text-blue-300 hover:fill-blue-300 fill-white text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3 text-white"
                >
                    <VideoIcon height={22} width={22} />
                    <span>Start Recording</span>
                </label>
            )}

            {/* Stop Recording Button */}
            {recording && (
                <label
                    onClick={stopRecording}
                    className="cursor-pointer inline-flex items-center justify-center bg-black hover:text-blue-300 hover:fill-blue-300 fill-white text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3 text-white"
                >
                    <NoVideoIcon height={28} width={28} />
                    <span>{`Stop Recording: ${timer}s`}</span>
                </label>
            )}

            {/* Buttons for recorded video */}
            {videoParts.current.length > 0 && !recording && (
                <div className="flex flex-col items-center justify-between">
                    {/* Start Recording Button */}
                    <label
                        onClick={startRecording}
                        className="cursor-pointer inline-flex items-center justify-center bg-black hover:text-blue-300 hover:fill-blue-300 fill-white text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3 mb-2 text-white"
                    >
                        <VideoIcon height={22} width={22} />
                        <span>Start Recording</span>
                    </label>

                    {/* Upload Recording Button */}
                    <label
                        onClick={uploadVideo}
                        className="cursor-pointer inline-flex items-center justify-center bg-black hover:text-blue-300 hover:fill-blue-300 fill-white text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3 mb-2 text-white"
                    >
                        <UploadIcon height={30} width={30} />
                        <span>Upload Recording</span>
                    </label>

                    {/* Download Recording Button */}
                    <label
                        onClick={downloadVideo}
                        className="cursor-pointer inline-flex items-center justify-center bg-black hover:text-blue-300 hover:fill-blue-300 fill-white text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3 text-white"
                    >
                        <DownloadIcon height={22} width={22} />
                        <span>Download Recording</span>
                    </label>
                </div>
            )}

            {/* Uploading Animation */}
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
