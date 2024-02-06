// RecordButton.js
import React from 'react';
import RecordIcon from '../components/assets/recordIcon';

export default function RecordButton({ onClick }) {
    return (
        <label
            onClick={onClick}
            className="cursor-pointer flex items-center justify-center bg-black hover:text-blue-300 hover:fill-blue-300 fill-white text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full text-slate-950 space-x-3 text-white"
        >
            <RecordIcon />
            
            <span>Record File</span>
        </label>
    );
}

