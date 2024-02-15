/**
 * The ToggleButton component renders two buttons with a toggle effect based on the activeButton prop.
 * @returns The ToggleButton component is being returned. The activeButton prop determines which button
 * has a black background, and the updateToggleButton prop is a function that is called when a button is clicked.
**/

// Import react
import React from 'react';

const ToggleButton = ({ activeButton, updateToggleButton }) => {
    return (
        <div className="flex flex-row relative rounded-full border border-gray-300 border-solid p-1 border-1 text-white">
            {/* Black background for Captions button */}
            {activeButton === 'captions' && (
                <div className="absolute inset-y-0 left-0 bg-black z-10 w-1/2 text-blue-300 rounded-full transition-transform transform"></div>
            )}
            {/* Black background for Voice Over button */}
            {activeButton === 'voiceover' && (
                <div className="absolute inset-y-0 right-0 bg-black z-10 w-1/2 text-blue-300 rounded-full transition-transform transform"></div>
            )}

            {/* Captions button */}
            <button
                className={`flex-1 p-2 focus:outline-none relative z-20 rounded-full sm:text-lg md:text-xl ${activeButton === 'captions' ? 'text-blue-300' : 'text-white'
                    }`}
                onClick={() => updateToggleButton('captions')}
            >
                Captions
            </button>

            {/* Voice Over button */}
            <button
                className={`flex-1 p-2 focus:outline-none relative z-20 rounded-full sm:text-lg md:text-xl ${activeButton === 'voiceover' ? 'text-blue-300' : 'text-white'
                    }`}
                onClick={() => updateToggleButton('voiceover')}
            >
                Voice-Over
            </button>
        </div>
    );
};

export default ToggleButton;
