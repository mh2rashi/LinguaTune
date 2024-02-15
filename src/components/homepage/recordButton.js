/**
 * This code renders the RecordButton within the Home page when clicked.
 * @returns This component renders a label element with a click event handler and styling.
**/

// Import React and Icon
import React from 'react';
import {RecordIcon} from '../../assets/icons';

export default function RecordButton({ onClick }) {
    return (
        <label
            // Button label with click event and styling
            onClick={onClick}
            className="cursor-pointer flex items-center justify-center bg-black hover:text-blue-300 hover:fill-blue-300 fill-white text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full text-slate-950 space-x-3 text-white"
        >
            <RecordIcon height={22} width={22}/>
            <span>Record File</span>
        </label>
    );
}
