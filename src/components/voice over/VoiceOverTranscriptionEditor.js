/**
 * The above code is a React component called VoiceOverTranscriptionEditor that renders a transcription
 * editor with start time, end time, and content inputs for each transcription item.
 * @returns The VoiceOverTranscriptionEditor component is being returned.
 */

// Import React
import React, { useState, useEffect } from "react";

const VoiceOverTranscriptionEditor = ({ uniqueKeyVoiceOver, transcriptionItems }) => {
    // Update component when transcriptionItems change
    useEffect(() => {
        // Add logic for handling transcriptionItems change if needed
    }, [transcriptionItems]);

    // Transcription item component
    function TranscriptionItem({ item }) {
        // State variables for start time, end time, and content of the transcription item
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

        return (
            // Render transcription item inputs
            <div className="my-1 grid grid-cols-3 gap-1 items-center text-white/90" style={{ gridTemplateColumns: '10% 10% 80%' }}>
                <input type="text"
                    className="bg-white/10 p-1 rounded-md sm:text-lg md:text-xl"
                    value={startValue}
                    onChange={handleStartTimeChange}
                />
                <input type="text"
                    className="bg-white/10 p-1 rounded-md sm:text-lg md:text-xl"
                    value={endValue}
                    onChange={handleEndTimeChange}
                />
                <input type="text"
                    className="bg-white/10 p-1 rounded-md sm:text-lg md:text-xl"
                    value={contentValue}
                    onChange={handleContentChange}
                />
            </div>
        );
    }

    return (
        <>
            {/* Header for transcription editor */}
            <div className="text-white bg-black border border-gray-300 border-solid p-2  grid grid-cols-3 gap-1 rounded-md" style={{ gridTemplateColumns: '10% 10% 80%' }}>
                <h1 className="text-left border-solid border-white border-1 sm:text-lg md:text-xl">Start</h1>
                <h1 className="text-left border-solid border-white border-1 sm:text-lg md:text-xl">End</h1>
                <h1 className="text-center border-solid border-white border-1 sm:text-lg md:text-xl">Content</h1>
            </div>
            {/* Render transcription items */}
            {transcriptionItems && (
                <div className="flex-col">
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

export default VoiceOverTranscriptionEditor;

