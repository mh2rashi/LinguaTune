import React, { useState, useEffect, useRef } from 'react';

const VoiceDropdownButton = ({ onSelectLanguageCode, onSelectVoice }) => {
    const [isOpenLanguage, setIsOpenLanguage] = useState(false);
    const [isOpenGender, setIsOpenGender] = useState(false);
    const [isOpenVoice, setIsOpenVoice] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState("US English");
    const [selectedGender, setSelectedGender] = useState("Female");
    const [selectedVoice, setSelectedVoice] = useState("Salli");

    const dropdownRef = useRef(null);

    const languageNames = [
        "Turkish", "Swedish", "Russian", "Romanian", "Portuguese",
        "Brazilian Portuguese", "Polish", "Dutch", "Norwegian", "Korean",
        "Japanese", "Italian", "Icelandic", "French", "Canadian French",
        "US Spanish", "Mexican Spanish", "Castilian Spanish", "Welsh English",
        "US English", "Indian English", "British English", "Australian English",
        "German", "Danish", "Welsh", "Chinese Mandarin", "Arabic"
    ];

    const LanguageGenders = {
        "US English": ["Male", "Female"],
    }

    const LanguageVoices = {
        "US English": {
            "Male": ["Matthew", "Justin", "Joey"],
            "Female": ["Salli", "Kimberly", "Kendra", "Joanna", "Ivy", "Raveena"]
        },
        
    };

    const LanguageCode = {
        "US English": "en-US",
    };

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

    const handleLanguageClick = (language) => {

        // Set selected language
        setSelectedLanguage(language);

        // Close all other dropdown menus
        setIsOpenLanguage(false);
        setIsOpenGender(false);
        setIsOpenVoice(false);

        // Reset gender and voice selections when language changes
        setSelectedGender(LanguageGenders[language][0]);
        setSelectedVoice(LanguageVoices[language][selectedGender][0]);

        // Outputs
        onSelectLanguageCode(LanguageCode[language]);
        onSelectVoice(LanguageVoices[language][selectedGender][0]);
    };

    const handleGenderClick = (gender) => {

        // Set selected gender
        setSelectedGender(gender);

        // Close all other languages
        setIsOpenLanguage(false);
        setIsOpenGender(false);
        setIsOpenVoice(false);

        // Reset voice selection when gender changes
        setSelectedVoice(LanguageVoices[selectedLanguage][gender][0]);

        // Outputs
        onSelectLanguageCode(LanguageCode[selectedLanguage]);
        onSelectVoice(LanguageVoices[selectedLanguage][gender][0]);
    };

    const handleVoiceClick = (voice) => {
        // Set selected voice
        setSelectedVoice(voice);


        // Close all other languages
        setIsOpenLanguage(false);
        setIsOpenGender(false);
        setIsOpenVoice(false);

        // Outputs
        onSelectLanguageCode(LanguageCode[selectedLanguage]);
        onSelectVoice(voice);
    };

    return (
        <div ref={dropdownRef} className="relative mt-3">

            {/* Language */}
            <button
                onClick={() => setIsOpenLanguage((prev) => !prev)}
                className="bg-black text-blue-300 p-2 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-100 active:text-white mb-2" // Add relative positioning
            >
                {selectedLanguage ? (
                    <div className="flex flex-col items-start">
                        <span className="font-bold">{selectedLanguage}</span>
                    </div>
                ) : (
                    'Language'
                )}
            </button>

            {isOpenLanguage && (
                <div className="absolute top-full left-0 bg-black text-white flex flex-col items-start rounded-lg p-2 w-full z-10 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white-500 scrollbar-track-white-800 relative">
                    {languageNames.map((language, index) => (
                        <div
                            key={index}
                            onClick={() => handleLanguageClick(language)}
                            className="flex p-2 w-full justify-between hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                        >
                            <h3 className="">{language}</h3>
                        </div>
                    ))}
                </div>
            )}

            {/* Gender */}
            <button
                onClick={() => setIsOpenGender((prev) => !prev)}
                className="bg-black text-blue-300 p-2 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-100 active:text-white mb-2" // Add relative positioning
            >
                {selectedGender ? (
                    <div className="flex flex-col items-start">
                        <span className="font-bold">{selectedGender}</span>
                    </div>
                ) : (
                    'Gender'
                )}
            </button>

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

            {/* Voice */}
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

export default VoiceDropdownButton;