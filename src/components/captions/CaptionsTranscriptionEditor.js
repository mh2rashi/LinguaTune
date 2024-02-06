import React, { useState, useEffect } from "react";

const CaptionsTranscriptionEditor = ({ uniqueKeyCaptions, transcriptionItems }) => {
    // Function 1
    function TranscriptionItem({ item }) {
        const [startValue, setStartValue] = useState(item.start_time || '');
        const [endValue, setEndValue] = useState(item.end_time || '');
        const [contentValue, setContentValue] = useState(item.content || '');

        const handleStartTimeChange = (e) => {
            const value = e.target.value;
            setStartValue(value);
        };

        const handleEndTimeChange = (e) => {
            const value = e.target.value;
            setEndValue(value);
        };

        const handleContentChange = (e) => {
            const value = e.target.value;
            setContentValue(value);
        };

        return (
            <div className="my-1 grid grid-cols-3 gap-1 items-center text-white/90" style={{ gridTemplateColumns: '12% 12% 76%' }}>
                <input type="text"
                    className="bg-white/10 p-1 rounded-md sm:text-lg md:text-xl flex"
                    value={startValue}
                    onChange={handleStartTimeChange}
                />
                <input type="text"
                    className="bg-white/10 p-1 rounded-md sm:text-lg md:text-xl flex"
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
            <div className="flex-1 text-white bg-black border border-gray-500 border-solid p-2 grid grid-cols-3 gap-1 rounded-md" style={{ gridTemplateColumns: '12% 12% 76%' }}>
                <h1 className="text-left border-solid border-gray-300 border-1 sm:text-lg md:text-xl">Start</h1>
                <h1 className="text-left border-solid border-gray-300 border-1 sm:text-lg md:text-xl">End</h1>
                <h1 className="text-center border-solid border-gray-300 border-1 sm:text-lg md:text-xl">Content</h1>
            </div>
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

export default CaptionsTranscriptionEditor;
