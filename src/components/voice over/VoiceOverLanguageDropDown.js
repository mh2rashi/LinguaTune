import React, { useState, useEffect, useRef } from 'react';

const VoiceOverLanguageDropDown = ({ selectedLanguageCode, selectedVoiceOver }) => {
    const [isOpenLanguage, setIsOpenLanguage] = useState(false);
    const [isOpenGender, setIsOpenGender] = useState(false);
    const [isOpenVoice, setIsOpenVoice] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState("US English");
    const [selectedGender, setSelectedGender] = useState("Male");
    const [selectedVoice, setSelectedVoice] = useState("Justin");

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
        "Turkish": "tr",
        "Swedish": "sv",
        "Russian": "ru",
        "Romanian": "ro",
        "Portuguese": "pt",
        "Brazilian Portuguese": "pt",
        "Polish": "pl",
        "Dutch": "nl",
        "Norwegian": "nb",
        "Korean": "ko",
        "Japanese": "ja",
        "Italian": "it",
        "Icelandic": "is",
        "French": "fr",
        "Canadian French": "fr",
        "US Spanish": "es",
        "Mexican Spanish": "es",
        "Castilian Spanish": "es",
        "Welsh English": "en",
        "US English": "en",
        "Indian English": "en",
        "British English": "en",
        "Australian English": "en",
        "German": "de",
        "Danish": "da",
        "Welsh": "cy",
        "Chinese Mandarin": "cmn",
        "Arabic": "arb"
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

        // Close all other dropdown menus
        setIsOpenLanguage(false);
        setIsOpenGender(false);
        setIsOpenVoice(false);

        // Reset gender and voice selections when language changes
        setSelectedLanguage(language);
        setSelectedGender(LanguageGenders[language][0]);
        setSelectedVoice(LanguageVoices[language][selectedGender][0]);

        selectedLanguageCode(languageCodes[language]);
        selectedVoiceOver(LanguageVoices[language][selectedGender][0])
    };

    const handleGenderClick = (gender) => {

        // Close all other dropdown menus
        setIsOpenLanguage(false);
        setIsOpenGender(false);
        setIsOpenVoice(false);


        // Set selected gender
        setSelectedGender(gender);

        // Outputs
        selectedVoiceOver(LanguageVoices[selectedLanguage][gender][0]);
    };

    const handleVoiceClick = (voice) => {

        // Close all other languages
        setIsOpenLanguage(false);
        setIsOpenGender(false);
        setIsOpenVoice(false);


        // Set selected voice
        setSelectedVoice(voice);

        // Outputs
        selectedVoiceOver(voice);
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

export default VoiceOverLanguageDropDown;
