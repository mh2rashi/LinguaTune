/**
 * The VoiceOverOptions component is a React component that allows users to select a language and
 * voice-over option and apply the voice-over to a video.
 * @returns The component returns a JSX structure that includes various elements such as language and voice-over
 * drop-downs and instructions.
**/

// Import React
import React, { useState, useEffect } from 'react';

// Import AWS SDK commands for translation and speech synthesis
import { TranslateTextCommand } from "@aws-sdk/client-translate";
import { StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";
import { translateClient, pollyClient } from "../../app/api/aws/clients";

// Import VoiceOver dropdown component 
import VoiceOverLanguageDropDown from "../voice over/VoiceOverLanguageDropDown";

// Import Icon
import { VoiceOverIcon2 } from "../../assets/icons";

// Helper function imports
import {generateSSMLParagraph} from "../../app/api/voice-over/voiceOverHelpers"

const VoiceOverOptions = ({ originalTranscriptionItems, currentTranscriptionItemsVoiceOver, updateCurrentTranscriptionItemsVoiceOver, updateApplyVoiceOverClicked, updateAudioFile }) => {
    
    // State for language code and voice-over
    const [selectedLanguageCode, setSelectedLanguageCode] = useState("en-US");
    const [selectedVoiceOver, setSelectedVoiceOver] = useState("Justin");

    useEffect(() => {
        // Set the default language to English on component mount
        changeTranscriptionLanguage("en");
    }, []);

    // Callback function to handle language selection
    const handleLanguageSelect = (languageCode) => {
        setSelectedLanguageCode(languageCode);
        changeTranscriptionLanguage(languageCode);
    };

    // Callback function to handle voice-over selection
    const handleVoiceOver = (voiceOver) => {
        setSelectedVoiceOver(voiceOver);
    };

    // Function to translate the transcription to the selected language
    async function changeTranscriptionLanguage(languageCode) {
        const client = translateClient();

        try {
            const translatedItems = await Promise.all(
                originalTranscriptionItems.map(async (item) => {
                    const params = {
                        SourceLanguageCode: 'auto',
                        TargetLanguageCode: languageCode,
                        Text: item.content,
                    };

                    try {
                        const command = new TranslateTextCommand(params);
                        const response = await client.send(command);
                        return response.TranslatedText;
                    } catch (error) {
                        console.error('Error translating text:', error);
                        throw error;
                    }
                })
            );

            let updateTranscriptionItemsVoiceOver = originalTranscriptionItems;

            // Update each transcription item with the translated content
            translatedItems.map((item, index) => {
                updateTranscriptionItemsVoiceOver[index].content = item;
            });

            updateCurrentTranscriptionItemsVoiceOver(updateTranscriptionItemsVoiceOver);

        } catch (error) {
            console.error('Error during translation:', error);
        }
    }

    // Function to create voice-over audio file
    async function getVoiceOver(transcriptionItems) {
        const client = pollyClient(); // Assuming this function exists

        const text = generateSSMLParagraph(transcriptionItems); // Assuming this function exists

        const input = {
            Engine: "standard",
            LanguageCode: selectedLanguageCode, // change this as well
            OutputFormat: "mp3",
            OutputS3BucketName: process.env.BUCKET_NAME,
            OutputS3KeyPrefix: "",
            TextType: "ssml",
            Text: text,
            VoiceId: selectedVoiceOver, // change this as well
        };

        try {
            const command = new StartSpeechSynthesisTaskCommand(input);
            const response = await client.send(command);

            console.log("Task ID:", response.SynthesisTask?.TaskId);
            updateAudioFile(response.SynthesisTask?.TaskId + ".mp3");
        } catch (error) {
            console.error("Error submitting synthesis task:", error);
        }
    };

    // Function to update transcription edits and apply voice-over
    function updateTranscriptionEdit() {
        const updatedTranscriptionItems = [...currentTranscriptionItemsVoiceOver];

        updatedTranscriptionItems.forEach((item, key) => {
            const container = document.getElementById(key);

            if (!container) {
                console.error(`Container with ID "${key}" not found.`);
                return;
            }

            const inputElements = container.querySelectorAll('input');
            const values = Array.from(inputElements).map((input) => input.value);

            updatedTranscriptionItems[key] = {
                ...item,
                start_time: values[0],
                end_time: values[1],
                content: values[2],
            };
        });

        updateCurrentTranscriptionItemsVoiceOver(updatedTranscriptionItems);

        console.log('Values:', updatedTranscriptionItems);
        console.log('Voice:', selectedVoiceOver);

        getVoiceOver(updatedTranscriptionItems);
    };

    // Apply voice-over when the button is clicked
    const applyVoiceOver = () => {
        updateTranscriptionEdit();
        //updateApplyVoiceOverClicked(true);
    };

    return (
        <>
            <div className="flex flex-col justify-around flex-1 border border-gray-300 border-solid p-1 rounded-md">
                {/* Instruction 1 */}
                <div>
                    <div className="flex items-center gap-3 mt-6 text-white/90">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold justify-center item-center text-white-300">01</h3>
                        <h3 className="text-lg sm:text-xl md:text-2xl justify-center pb-0.5">Choose your language and preferred voice for <span className="text-blue-300">voice-over</span>.</h3>
                    </div>
                    <VoiceOverLanguageDropDown selectedLanguageCode={handleLanguageSelect} selectedVoiceOver={handleVoiceOver} />
                </div>

                {/* Instruction 2 */}
                <div className="flex flex-col gap-3 text-white/90">
                    <div className="flex items-center gap-3 mt-6">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold justify-center item-center text-white-300">02</h3>
                        <h3 className="text-lg sm:text-xl md:text-2xl justify-center pb-2">Edit the <span className="text-blue-300">transcription</span> below to be applied as <span className="text-blue-300">voice over</span> to your video.</h3>
                    </div>
                </div>
            </div>

            {/* Apply voice-over button */}
            <label onClick={applyVoiceOver} className="cursor-pointer inline-flex items-center justify-center bg-black hover:text-blue-300 hover:fill-blue-300 fill-white text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3 text-white">
                <VoiceOverIcon2 height={24} width={24} />
                <span>Apply Voice Over</span>
            </label>
        </>
    );
};

export default VoiceOverOptions;
