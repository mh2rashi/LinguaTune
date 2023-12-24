import React, { useState, useEffect } from "react";


const VoiceOverTranscriptionEditor = ({ uniqueKeyVoiceOver, transcriptionItems }) => {

    useEffect(() => {

    }, [transcriptionItems]);


    // Function 1
    function TranscriptionItem({ item, key }) {
        if (!item) {
            return '';
        }

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
            <div className="my-1 grid grid-cols-3 gap-1 items-center" style={{ gridTemplateColumns: '10% 10% 80%' }}>
                <input type="text"
                    className="bg-white/20 p-1 rounded-md sm:text-lg md:text-xl"
                    value={startValue}
                    onChange={handleStartTimeChange}
                />
                <input type="text"
                    className="bg-white/20 p-1 rounded-md sm:text-lg md:text-xl"
                    value={endValue}
                    onChange={handleEndTimeChange}
                />
                <input type="text"
                    className="bg-white/20 p-1 rounded-md sm:text-lg md:text-xl"
                    value={contentValue}
                    onChange={handleContentChange}
                />

            </div>

        );
    }



    return (

        <>

            <div className="text-white bg-black border border-white border-solid p-2 border-2 grid grid-cols-3 gap-1 rounded-md" style={{ gridTemplateColumns: '10% 10% 80%' }}>

                <h1 className="text-left border-solid border-white border-1 sm:text-lg md:text-xl">Start</h1>
                <h1 className="text-left border-solid border-white border-1 sm:text-lg md:text-xl">End</h1>
                <h1 className="text-center border-solid border-white border-1 sm:text-lg md:text-xl">Content</h1>

            </div>

            {transcriptionItems && (
                <div className="h-24 sm:h-auto overflow-y-auto sm:overflow-auto">
                    {transcriptionItems.map((item, key) => (
                        <div key={key} id={key}>
                            <TranscriptionItem
                                item={item}
                                key={key}
                            />
                        </div>
                    ))}
                </div>
            )}

        </>

    );

};

export default VoiceOverTranscriptionEditor