/**
 * The code is a React component for a transcription editor that allows users to edit start time, end
 * time, and content of transcription items.
 * @returns The code is returning a React component called `CaptionsTranscriptionEditor`. This
 * component renders a transcription editor with a header for column titles and a list of transcription
 * items. Each transcription item is rendered using the `TranscriptionItem` component. The
 * `CaptionsTranscriptionEditor` component receives an array of `transcriptionItems` as a prop and maps
 * through each item to render the `Transcription
**/

// React imports
import React, { useState } from "react";

// Main component for the transcription editor
const CaptionsTranscriptionEditor = ({ uniqueKeyCaptions, transcriptionItems }) => {

    // Component for editing a single transcription item
    function TranscriptionItem({ item }) {
        // State variables for start time, end time, and content
        const [startValue, setStartValue] = useState(item.start_time || '');
        const [endValue, setEndValue] = useState(item.end_time || '');
        const [contentValue, setContentValue] = useState(item.content || '');

        // Event handler for start time change
        const handleStartTimeChange = (e) => {
            const value = e.target.value;
            setStartValue(value);
        };

        // Event handler for end time change
        const handleEndTimeChange = (e) => {
            const value = e.target.value;
            setEndValue(value);
        };

        // Event handler for content change
        const handleContentChange = (e) => {
            const value = e.target.value;
            setContentValue(value);
        };

        // JSX for rendering the transcription item
        return (
            <div className="my-1 grid grid-cols-3 gap-1 items-center text-white/90" style={{ gridTemplateColumns: '12% 12% 76%' }}>
                {/* Input for start time */}
                <input type="text"
                    className="bg-white/10 p-1 rounded-md sm:text-lg md:text-xl flex"
                    value={startValue}
                    onChange={handleStartTimeChange}
                />
                {/* Input for end time */}
                <input type="text"
                    className="bg-white/10 p-1 rounded-md sm:text-lg md:text-xl flex"
                    value={endValue}
                    onChange={handleEndTimeChange}
                />
                {/* Input for content */}
                <input type="text"
                    className="bg-white/10 p-1 rounded-md sm:text-lg md:text-xl"
                    value={contentValue}
                    onChange={handleContentChange}
                />
            </div>
        );
    };
    // JSX for rendering the transcription editor
    return (
        <>
            {/* Header for column titles */}
            <div className="flex-1 text-white bg-black border border-gray-300 border-solid p-2 grid grid-cols-3 gap-1 rounded-md" style={{ gridTemplateColumns: '12% 12% 76%' }}>
                <h1 className="text-left border-solid border-gray-300 border-1 sm:text-lg md:text-xl">Start</h1>
                <h1 className="text-left border-solid border-gray-300 border-1 sm:text-lg md:text-xl">End</h1>
                <h1 className="text-center border-solid border-gray-300 border-1 sm:text-lg md:text-xl">Content</h1>
            </div>
            {/* Display transcription items */}
            {transcriptionItems && (
                <div className="flex-col">
                    {/* Map through each item and render TranscriptionItem component */}
                    {transcriptionItems.map((item, key) => (
                        <div key={key} id={key}>
                            <TranscriptionItem item={item} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default CaptionsTranscriptionEditor;
