// RecordButton.js
import React from 'react';
import RecordIcon from '../components/assets/recordIcon';

export default function RecordButton({ onClick }) {
    return (
        <label
            onClick={onClick}
            className="cursor-pointer flex items-center justify-center bg-white hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full text-slate-950 space-x-3"
        >
            <RecordIcon />
            <span>Record File</span>
        </label>
    );
}

