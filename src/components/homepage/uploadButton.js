/**
 * The `UploadButton` function is a React component that handles file uploads using Axios and displays
 * an upload animation while the file is being uploaded.
 * @returns The UploadButton component is being returned.
**/

'use client';

// Import React dependencies
import { useState } from "react";
import { useRouter } from "next/navigation";

// Import Axios for making HTTP requests
import axios from "axios";

// Import icons and animations
import {UploadIcon} from "../../assets/icons";
import Lottie from "lottie-react";
import uploadAnimation from "../../assets/animations/uploadAnimation";

export default function UploadButton() {
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    // Function to handle file upload
    async function upload(event) {
        event.preventDefault();

        // Extract files
        const files = event.target.files;

        if (files.length > 0) {
            // Get first file
            const file = files[0];

            setIsUploading(true);

            try {
                // POST request using axios
                const res = await axios.postForm('/api/upload', {
                    file,
                });

                setIsUploading(false);

                const newName = res.data.uniqueName;

                router.push('/' + newName);
            } catch (error) {
                // Handle errors
                console.error('Error uploading file:', error);
                setIsUploading(false);
            }
        }
    }

    return (
        <>
            <label className="cursor-pointer flex items-center justify-center bg-black hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full text-slate-950 space-x-3 text-white">
                <UploadIcon height={28} width={28} />
                <span>Upload File</span>
                <input onChange={upload} type="file" className="hidden" />
            </label>

            {/* Display upload animation when uploading */}
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
