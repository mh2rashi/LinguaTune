/**
 * The `VoiceOverLanguageDropDown` component is a dropdown menu that allows users to select a language,
 * gender, and voice for a voice-over feature.
 * @returns The component is returning a dropdown menu for selecting a voiceover language, gender, and
 * voice. The selected language, gender, and voice are displayed in separate buttons. When the buttons
 * are clicked, the corresponding dropdown options are displayed. The selected options are stored in
 * state variables and passed to the parent component through callback functions.
**/

// React imports
import React, { useState, useEffect, useRef } from 'react';

const VoiceOverLanguageDropDown = ({ selectedLanguageCode, selectedVoiceOver }) => {
    // State variables to manage dropdown visibility and selections
    const [isOpenLanguage, setIsOpenLanguage] = useState(false);
    const [isOpenGender, setIsOpenGender] = useState(false);
    const [isOpenVoice, setIsOpenVoice] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("US English");
    const [selectedGender, setSelectedGender] = useState("Male");
    const [selectedVoice, setSelectedVoice] = useState("Justin");

    // Ref to detect clicks outside dropdown
    const dropdownRef = useRef(null);

    const languageNames = [
        "Turkish", "Swedish", "Russian", "Romanian", "Portuguese", "Brazilian Portuguese", "Polish", "Dutch",
        "Norwegian", "Korean", "Japanese", "Italian", "Icelandic", "French", "Canadian French", "US Spanish",
        "Mexican Spanish", "Castilian Spanish", "Welsh English", "US English","Indian English",
        "British English", "Australian English", "German", "Danish", "Welsh", "Chinese Mandarin", "Arabic"
    ];

    const LanguageGenders = {
        "Turkish": ["Female"],
        "Swedish": ["Female"],
        "Russian": ["Female", "Male"],
        "Romanian": ["Female"],
        "Portuguese": ["Female", "Male"],
        "Brazilian Portuguese": ["Female", "Male"],
        "Polish": ["Female", "Male"],
        "Dutch": ["Male", "Female"],
        "Norwegian": ["Female"],
        "Korean": ["Female"],
        "Japanese": ["Male", "Female"],
        "Italian": ["Female", "Male"],
        "Icelandic": ["Male", "Female"],
        "French": ["Male", "Female"],
        "Canadian French": ["Female"],
        "US Spanish": ["Female", "Male"],
        "Mexican Spanish": ["Female"],
        "Castilian Spanish": ["Female", "Male"],
        "Welsh English": ["Male", "Female"],
        "US English": ["Female", "Male"],
        "Indian English": ["Female"],
        "British English": ["Female", "Male"],
        "Australian English": ["Male", "Female"],
        "German": ["Female", "Male"],
        "Danish": ["Female", "Male"],
        "Welsh": ["Female"],
        "Chinese Mandarin": ["Female"],
        "Arabic": ["Female"]
    };

    const LanguageVoices = {
        "Turkish": {
            "Female": ["Filiz"],
        },
        "Swedish": {
            "Female": ["Astrid"],
        },
        "Russian": {
            "Female": ["Tatyana"],
            "Male": ["Maxim"],
        },
        "Romanian": {
            "Female": ["Carmen"],
        },
        "Portuguese": {
            "Female": ["Ines"],
            "Male": ["Cristiano"],
        },
        "Brazilian Portuguese": {
            "Female": ["Vitoria", "Camila"],
            "Male": ["Ricardo"],
        },
        "Polish": {
            "Female": ["Maja", "Ewa"],
            "Male": ["Jan", "Jacek"],
        },
        "Dutch": {
            "Male": ["Ruben"],
            "Female": ["Lotte"],
        },
        "Norwegian": {
            "Female": ["Liv"],
        },
        "Korean": {
            "Female": ["Seoyeon"],
        },
        "Japanese": {
            "Male": ["Takumi"],
            "Female": ["Mizuki"],
        },
        "Italian": {
            "Female": ["Bianca", "Carla"],
            "Male": ["Giorgio"],
        },
        "Icelandic": {
            "Male": ["Karl"],
            "Female": ["Dora"],
        },
        "French": {
            "Male": ["Mathieu"],
            "Female": ["Lea", "Celine"],
        },
        "Canadian French": {
            "Female": ["Chantal"],
        },
        "US Spanish": {
            "Female": ["Penelope", "Lupe"],
            "Male": ["Miguel"],
        },
        "Mexican Spanish": {
            "Female": ["Mia"],
        },
        "Castilian Spanish": {
            "Female": ["Lucia", "Conchita"],
            "Male": ["Enrique"],
        },
        "Welsh English": {
            "Male": ["Geraint"],
        },
        "US English": {
            "Female": ["Salli", "Kimberly", "Joanna", "Ivy", "Raveena"],
            "Male": ["Matthew", "Justin", "Joey"],
        },
        "Indian English": {
            "Female": ["Aditi"],
        },
        "British English": {
            "Female": ["Emma", "Amy"],
            "Male": ["Brian", "Russell"],
        },
        "Australian English": {
            "Female": ["Nicole"],
            "Male": ["Russell"],
        },
        "German": {
            "Female": ["Vicki", "Marlene"],
            "Male": ["Hans"],
        },
        "Danish": {
            "Female": ["Naja"],
            "Male": ["Mads"],
        },
        "Welsh": {
            "Female": ["Gwyneth"],
        },
        "Chinese Mandarin": {
            "Female": ["Zhiyu"],
        },
        "Arabic": {
            "Female": ["Zeina"],
        },
    };
    
    const languageCodes = {
        "Turkish": "tr-TR",
        "Swedish": "sv-SE",
        "Russian": "ru-RU",
        "Romanian": "ro-RO",
        "Portuguese": "pt-PT",
        "Brazilian Portuguese": "pt-BR",
        "Polish": "pl-PL",
        "Dutch": "nl-NL",
        "Norwegian": "nb-NO",
        "Korean": "ko-KR",
        "Japanese": "ja-JP",
        "Italian": "it-IT",
        "Icelandic": "is-IS",
        "French": "fr-FR",
        "Canadian French": "fr-CA",
        "US Spanish": "es-US",
        "Mexican Spanish": "es-MX",
        "Castilian Spanish": "es-ES",
        "Welsh English": "en-GB-WLS",
        "US English": "en-US",
        "Indian English": "en-IN",
        "British English": "en-GB",
        "Australian English": "en-AU",
        "German": "de-DE",
        "Danish": "da-DK",
        "Welsh": "cy-GB",
        "Chinese Mandarin": "cmn-CN",
        "Arabic": "arb"
    };
    

    // Effect to close dropdowns when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenLanguage(false);
                setIsOpenGender(false);
                setIsOpenVoice(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // Function to handle language selection
    const handleLanguageClick = (language) => {
        setIsOpenLanguage(false);
        setIsOpenGender(false);
        setIsOpenVoice(false);

        setSelectedLanguage(language);
        setSelectedGender(LanguageGenders[language][0]); // Set default gender
        setSelectedVoice(LanguageVoices[language][LanguageGenders[language][0]][0]); // Set default voice
        
        selectedLanguageCode(languageCodes[language]); // Pass selected language code
        selectedVoiceOver(LanguageVoices[language][LanguageGenders[language][0]][0]); // Pass selected voice
    };

    // Function to handle gender selection
    const handleGenderClick = (gender) => {
        setIsOpenLanguage(false);
        setIsOpenGender(false);
        setIsOpenVoice(false);

        setSelectedGender(gender);
        setSelectedVoice(LanguageVoices[selectedLanguage][gender][0]); // Set default voice


        selectedVoiceOver(LanguageVoices[selectedLanguage][gender][0]); // Pass selected voice
    };

    // Function to handle voice selection
    const handleVoiceClick = (voice) => {
        setIsOpenLanguage(false);
        setIsOpenGender(false);
        setIsOpenVoice(false);

        setSelectedVoice(voice); // Pass selected voice

        selectedVoiceOver(voice);
    };

    // Render dropdown
    return (
        <div ref={dropdownRef} className="relative mt-3">
            {/* Language Dropdown */}
            <button
                onClick={() => setIsOpenLanguage((prev) => !prev)}
                className="bg-black text-blue-300 p-2 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-100 active:text-white mb-2" // Add relative positioning
            >
                {selectedLanguage ? (
                    <span>{selectedLanguage}</span>
                ) : (
                    'Language'
                )}
            </button>

            {/* Language Options */}
            {isOpenLanguage && (
                <div className="absolute top-full left-0 bg-black text-white flex flex-col items-start rounded-lg p-2 w-full z-10 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white-500 scrollbar-track-white-800 relative">
                    {languageNames.map((language, index) => (
                        <div
                            key={index}
                            onClick={() => handleLanguageClick(language)}
                            className=" z-10 flex p-2 w-full justify-between hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                        >
                            <h3 className="">{language}</h3>
                        </div>
                    ))}
                </div>
            )}

            {/* Gender Dropdown */}
            <button
                onClick={() => setIsOpenGender((prev) => !prev)}
                className="bg-black text-blue-300 p-2 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-100 active:text-white mb-2" // Add relative positioning
            >
                {selectedGender ? (
                        <span className="font-bold">{selectedGender}</span>
                ) : (
                    'Gender'
                )}
            </button>

            {/* Gender Options */}
            {isOpenGender && (
                <div className="absolute top-full left-0 bg-black text-white flex flex-col items-start rounded-lg p-2 w-full z-10 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white-500 scrollbar-track-white-800 relative">
               
                    {LanguageGenders[selectedLanguage]?.map((gender, index) => (
                        <div
                            key={index}
                            onClick={() => handleGenderClick(gender)}
                            className="flex p-2 w-full justify-between hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                        >
                            <h3 className="">{gender}</h3>
                        </div>
                    ))}
                </div>
            )}

            {/* Voice Dropdown */}
            <button
                onClick={() => setIsOpenVoice((prev) => !prev)}
                className="bg-black text-blue-300 p-2 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-100 active:text-white"
            >
                {selectedVoice ? (
                    <div className="flex flex-col items-start">
                        <span className="font-bold">{selectedVoice}</span>
                    </div>
                ) : (
                    'Voice'
                )}
            </button>

            {/* Voice Options */}
            {isOpenVoice && (
                <div className="absolute top-full left-0 bg-black text-white flex flex-col items-start rounded-lg p-2 w-full z-10 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white-500 scrollbar-track-white-800 relative">
                    
                    {LanguageVoices[selectedLanguage]?.[selectedGender]?.map((voice, index) => (
                        <div
                            key={index}
                            onClick={() => handleVoiceClick(voice)}
                            className="flex p-2 w-full justify-between hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                        >
                            <h3 className="">{voice}</h3>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default VoiceOverLanguageDropDown;
