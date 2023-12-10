import React, { useState, useEffect, useRef } from 'react';

const CaptionsLanguageDropDown = ({ selectedLanguageCode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("English");
    const dropdownRef = useRef(null);

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

    const handleOptionClick = (language) => {
        setSelectedOption(language.LanguageName);
        setIsOpen(false);
        selectedLanguageCode(language.LanguageCode);
    };

    return (
        <div ref={dropdownRef} className="relative mt-3">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="bg-black text-blue-300 p-2 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-100 active:text-white"
            >
                {selectedOption ? (
                    <div className="flex flex-col items-start">
                        <span className="font-bold">{selectedOption}</span>
                    </div>
                ) : (
                    'Dropdown'
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 bg-black text-white flex flex-col items-start rounded-lg p-2 w-full z-10 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white-500 scrollbar-track-white-800">
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