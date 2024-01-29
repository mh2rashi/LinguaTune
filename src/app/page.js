'use client'
import DemoSection from "../components/demoSection";
import UploadButton, { isUploading, setIsUploading } from "../components/uploadButton";
import RecordButton from "../components/recordButton";
import DemoButton from "../components/demoButton";
import RecordVideoSection from "../components/recordVideoSection"
import { useState } from 'react';
import AboutSection from "../components/aboutSection"



export default function Home() {
    const [recordButtonClicked, setRecordButtonClicked] = useState(false);

    return (

        <>
            <div className="flex items-center justify-center gap-6">
                

                {/* Conditionally render RecordButton or DemoButton based on state */}
                {recordButtonClicked ?
                    <DemoButton onClick={() => setRecordButtonClicked(!recordButtonClicked)} />
                 : 
                    <RecordButton onClick={() => setRecordButtonClicked(!recordButtonClicked)} />
                }

                <UploadButton />
            </div>

            {recordButtonClicked ? <RecordVideoSection /> : <DemoSection />}

            <AboutSection/>

        </>
    );
}

