/**
 * The `CaptionsLanguageDropDown` component is a dropdown menu that allows users to select a language
 * from a list of options.
 * @returns The component is returning a dropdown menu for selecting a language. The dropdown menu
 * consists of a button that displays the currently selected language, and when clicked, it opens a
 * list of available languages to choose from. The selected language is displayed in the button, and
 * when a language is selected from the dropdown menu, the selected language code is passed to the
 * `selectedLanguageCode` prop.
 **/

// React Imports
import React, { useState, useEffect, useRef } from 'react';

const CaptionsLanguageDropDown = ({ selectedLanguageCode }) => {
    // State for managing dropdown visibility and selected language
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("English");

    // Reference for detecting clicks outside the dropdown
    const dropdownRef = useRef(null);

    // List of available languages
    const LanguageList = [
        {
            "LanguageCode": "af",
            "LanguageName": "Afrikaans"
        },
        {
            "LanguageCode": "sq",
            "LanguageName": "Albanian"
        },
        {
            "LanguageCode": "am",
            "LanguageName": "Amharic"
        },
        {
            "LanguageCode": "ar",
            "LanguageName": "Arabic"
        },
        {
            "LanguageCode": "hy",
            "LanguageName": "Armenian"
        },
        {
            "LanguageCode": "az",
            "LanguageName": "Azerbaijani"
        },
        {
            "LanguageCode": "bn",
            "LanguageName": "Bengali"
        },
        {
            "LanguageCode": "bs",
            "LanguageName": "Bosnian"
        },
        {
            "LanguageCode": "bg",
            "LanguageName": "Bulgarian"
        },
        {
            "LanguageCode": "fr-CA",
            "LanguageName": "Canadian French"
        },
        {
            "LanguageCode": "ca",
            "LanguageName": "Catalan"
        },
        {
            "LanguageCode": "zh",
            "LanguageName": "Chinese"
        },
        {
            "LanguageCode": "zh-TW",
            "LanguageName": "Chinese Traditional"
        },
        {
            "LanguageCode": "hr",
            "LanguageName": "Croatian"
        },
        {
            "LanguageCode": "cs",
            "LanguageName": "Czech"
        },
        {
            "LanguageCode": "da",
            "LanguageName": "Danish"
        },
        {
            "LanguageCode": "fa-AF",
            "LanguageName": "Dari"
        },
        {
            "LanguageCode": "nl",
            "LanguageName": "Dutch"
        },
        {
            "LanguageCode": "en",
            "LanguageName": "English"
        },
        {
            "LanguageCode": "et",
            "LanguageName": "Estonian"
        },
        {
            "LanguageCode": "fi",
            "LanguageName": "Finnish"
        },
        {
            "LanguageCode": "fr",
            "LanguageName": "French"
        },
        {
            "LanguageCode": "ka",
            "LanguageName": "Georgian"
        },
        {
            "LanguageCode": "de",
            "LanguageName": "German"
        },
        {
            "LanguageCode": "el",
            "LanguageName": "Greek"
        },
        {
            "LanguageCode": "gu",
            "LanguageName": "Gujarati"
        },
        {
            "LanguageCode": "ht",
            "LanguageName": "Haitian Creole"
        },
        {
            "LanguageCode": "ha",
            "LanguageName": "Hausa"
        },
        {
            "LanguageCode": "he",
            "LanguageName": "Hebrew"
        },
        {
            "LanguageCode": "hi",
            "LanguageName": "Hindi"
        },
        {
            "LanguageCode": "hu",
            "LanguageName": "Hungarian"
        },
        {
            "LanguageCode": "is",
            "LanguageName": "Icelandic"
        },
        {
            "LanguageCode": "id",
            "LanguageName": "Indonesian"
        },
        {
            "LanguageCode": "ga",
            "LanguageName": "Irish"
        },
        {
            "LanguageCode": "it",
            "LanguageName": "Italian"
        },
        {
            "LanguageCode": "ja",
            "LanguageName": "Japanese"
        },
        {
            "LanguageCode": "kn",
            "LanguageName": "Kannada"
        },
        {
            "LanguageCode": "kk",
            "LanguageName": "Kazakh"
        },
        {
            "LanguageCode": "ko",
            "LanguageName": "Korean"
        },
        {
            "LanguageCode": "lv",
            "LanguageName": "Latvian"
        },
        {
            "LanguageCode": "lt",
            "LanguageName": "Lithuanian"
        },
        {
            "LanguageCode": "mk",
            "LanguageName": "Macedonian"
        },
        {
            "LanguageCode": "ms",
            "LanguageName": "Malay"
        },
        {
            "LanguageCode": "ml",
            "LanguageName": "Malayalam"
        },
        {
            "LanguageCode": "mt",
            "LanguageName": "Maltese"
        },
        {
            "LanguageCode": "mr",
            "LanguageName": "Marathi"
        },
        {
            "LanguageCode": "es-MX",
            "LanguageName": "Mexican Spanish"
        },
        {
            "LanguageCode": "mn",
            "LanguageName": "Mongolian"
        },
        {
            "LanguageCode": "no",
            "LanguageName": "Norwegian"
        },
        {
            "LanguageCode": "ps",
            "LanguageName": "Pashto"
        },
        {
            "LanguageCode": "fa",
            "LanguageName": "Persian"
        },
        {
            "LanguageCode": "pl",
            "LanguageName": "Polish"
        },
        {
            "LanguageCode": "pt-PT",
            "LanguageName": "Portugal Portuguese"
        },
        {
            "LanguageCode": "pt",
            "LanguageName": "Portuguese"
        },
        {
            "LanguageCode": "pa",
            "LanguageName": "Punjabi"
        },
        {
            "LanguageCode": "ro",
            "LanguageName": "Romanian"
        },
        {
            "LanguageCode": "ru",
            "LanguageName": "Russian"
        },
        {
            "LanguageCode": "sr",
            "LanguageName": "Serbian"
        },
        {
            "LanguageCode": "si",
            "LanguageName": "Sinhala"
        },
        {
            "LanguageCode": "sk",
            "LanguageName": "Slovak"
        },
        {
            "LanguageCode": "sl",
            "LanguageName": "Slovenian"
        },
        {
            "LanguageCode": "so",
            "LanguageName": "Somali"
        },
        {
            "LanguageCode": "es",
            "LanguageName": "Spanish"
        },
        {
            "LanguageCode": "sw",
            "LanguageName": "Swahili"
        },
        {
            "LanguageCode": "sv",
            "LanguageName": "Swedish"
        },
        {
            "LanguageCode": "tl",
            "LanguageName": "Tagalog"
        },
        {
            "LanguageCode": "ta",
            "LanguageName": "Tamil"
        },
        {
            "LanguageCode": "te",
            "LanguageName": "Telugu"
        },
        {
            "LanguageCode": "th",
            "LanguageName": "Thai"
        },
        {
            "LanguageCode": "tr",
            "LanguageName": "Turkish"
        },
        {
            "LanguageCode": "uk",
            "LanguageName": "Ukrainian"
        },
        {
            "LanguageCode": "ur",
            "LanguageName": "Urdu"
        },
        {
            "LanguageCode": "uz",
            "LanguageName": "Uzbek"
        },
        {
            "LanguageCode": "vi",
            "LanguageName": "Vietnamese"
        },
        {
            "LanguageCode": "cy",
            "LanguageName": "Welsh"
        }
    ];

    // Effect to close the dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // Function to handle language selection
    const handleOptionClick = (language) => {
        setSelectedOption(language.LanguageName);
        setIsOpen(false);
        selectedLanguageCode(language.LanguageCode);
    };

    return (
        <div ref={dropdownRef} className="relative mt-3">
            {/* Dropdown button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="bg-black text-blue-300 p-2 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-100 active:text-white"
            >
                {selectedOption ? (
                    <span className="font-bold">{selectedOption}</span>
                ) : (
                    'Dropdown'
                )}
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute top-full left-0 bg-black text-white flex flex-col items-start rounded-lg p-2 w-full z-10 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white-500 scrollbar-track-white-800">
                    {/* Mapping through language list to render language options */}
                    {LanguageList.map((language, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(language)}
                            className="flex p-2 w-full justify-between hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                        >
                            <h3 className="">{language.LanguageName}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CaptionsLanguageDropDown;
