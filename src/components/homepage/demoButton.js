/**
 * This code renders the DemoButton within the Home page when clicked.
 * @returns This component renders a label element with a click event handler and styling.
**/

// Import React and Icon
import React from 'react';
import {LaptopIcon} from '../../assets/icons';

export default function DemoButton({ onClick }) {
    return (
        // Button label with click event and styling
        <label
            onClick={onClick}
            className="cursor-pointer flex items-center justify-center bg-black hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full text-slate-950 space-x-3 text-white hover:text-blue-300 hover:fill-blue-300 fill-white"
        >
            <LaptopIcon height={20} width={24} />
            <span className="items-center justify-center">View Demo</span>
        </label>
    );
}
