'use client';
import UploadIcon from "../components/assets/uploadIcon";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";


import Lottie from "lottie-react"
import uploadAnimation from "../components/assets/uploadAnimation"


export default function UploadButton() {

    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    async function upload(event) {
        event.preventDefault();

        // Extract files
        const files = event.target.files;

        if (files.length > 0) {
            // Get first file
            const file = files[0];

            setIsUploading(true);

            // POST request using axios
            const res = await axios.postForm('/api/upload', {
                file,
            });

            setIsUploading(false);

            const newName = res.data.uniqueName;

            router.push('/' + newName);

        }
    }

    return (

        <>
     
            <label className="cursor-pointer flex items-center justify-center bg-white hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full text-slate-950 space-x-3">
                <UploadIcon />
                <span>Upload File</span>
                <input onChange={upload} type="file" className="hidden" />
            </label>

            


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


        </>

    );
}
