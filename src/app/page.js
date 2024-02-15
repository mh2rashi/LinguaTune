/**
 * The Home component renders the homepage layout with conditional rendering for RecordButton, DemoButton,
 * RecordVideoSection, DemoSection, and AboutSection components.
 * @returns the Home component is being returned.
**/

'use client'

// React imports
import React, { useState } from 'react';

// Component imports
import DemoSection from "../components/homepage/demoSection";
import UploadButton from "../components/homepage/uploadButton";
import RecordButton from "../components/homepage/recordButton";
import DemoButton from "../components/homepage/demoButton";
import RecordVideoSection from "../components/homepage/recordVideoSection";
import AboutSection from "../components/homepage/aboutSection";

export default function Home() {
    const [recordButtonClicked, setRecordButtonClicked] = useState(false);

    return (
        <>
            {/* Container for RecordButton, DemoButton, and UploadButton */}
            <div className="flex items-center justify-center gap-6">
                {/* Conditionally render RecordButton or DemoButton based on state */}
                {recordButtonClicked ?
                    <DemoButton onClick={() => setRecordButtonClicked(!recordButtonClicked)} /> :
                    <RecordButton onClick={() => setRecordButtonClicked(!recordButtonClicked)} />
                }
                <UploadButton />
            </div>

            {/* Conditionally render RecordVideoSection or DemoSection based on state */}
            {recordButtonClicked ? <RecordVideoSection /> : <DemoSection />}

            {/* Render AboutSection */}
            <AboutSection/>
        </>
    );
}
