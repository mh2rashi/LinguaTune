/**
 * The `CaptionsOptions` component is a React component that allows users to select a language for
 * transcription and color options to be applied as captions to a video.
 * @returns The `CaptionsOptions` component is returning JSX elements, including a div container with
 * language selection and color selection options, and a label button for applying captions.
**/

// React imports
import React, { useState } from 'react';

// AWS Translate command import and client import
import { TranslateTextCommand } from "@aws-sdk/client-translate";
import { translateClient } from "../../app/api/aws/clients";

// Custom component import
import CaptionsLanguageDropDown from "../captions/CaptionsLanguageDropDown";

// Icon imports
import { CaptionIcon } from "../../assets/icons";



const CaptionsOptions = ({ originalTranscriptionItems, currentTranscriptionItemsCaptions, updateCurrentTranscriptionItemsCaptions, updateButtonClicked, updatePrimaryColor, updateOutlineColor }) => {
    // State for managing primary and outline colors
    const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
    const [outlineColor, setOutlineColor] = useState('#000000');

    // Call updateTranscription with the selected language code
    const handleLanguageSelect = (selectedLanguageCode) => {
        changeTranscriptionLanguage(selectedLanguageCode);
    };

    // Change Transcription Language
    async function changeTranscriptionLanguage(languageCode) {
        const translateClientInstance = translateClient();
        try {
            const translatedItems = await Promise.all(
                // Translate each transcription item asynchronously
                originalTranscriptionItems.map(async (item) => {
                    const params = {
                        SourceLanguageCode: 'auto', // Auto-detect source language
                        TargetLanguageCode: languageCode,
                        Text: item.content,
                    };
                    try {
                        const command = new TranslateTextCommand(params);
                        const response = await translateClientInstance.send(command);
                        return response.TranslatedText;
                    } catch (error) {
                        console.error('Error translating text:', error);
                        throw error;
                    }
                })
            );

            let updateTranscriptionItemsCaptions = originalTranscriptionItems;

            // Update each transcription item with the translated text
            translatedItems.forEach((item, index) => {
                updateTranscriptionItemsCaptions[index].content = item;
            });

            // Update the state with the translated transcription
            updateCurrentTranscriptionItemsCaptions(updateTranscriptionItemsCaptions);

        } catch (error) {
            console.error('Error during translation:', error);
            // Handle the error appropriately.
        }
    }

    // Update transcription edits
    const updateTranscriptionEdit = () => {
        const updatedTranscriptionItems = [...currentTranscriptionItemsCaptions];
        updatedTranscriptionItems.forEach((item, key) => {
            const container = document.getElementById(key);
            if (!container) {
                console.error(`Container with ID "${key}" not found.`);
                return;
            }
            // Select all input elements within the container
            const inputElements = container.querySelectorAll('input');
            // Get values from input elements
            const values = Array.from(inputElements).map((input) => input.value);
            // Update the corresponding item in the array
            updatedTranscriptionItems[key] = {
                ...item,
                start_time: values[0], // Assuming the first input is for start_time
                end_time: values[1],   // Assuming the second input is for end_time
                content: values[2],    // Assuming the third input is for content
            };
        });
        // Update the state with the edited transcription
        updateCurrentTranscriptionItemsCaptions(updatedTranscriptionItems);
    };

    // Apply captions
    const applyCaptions = () => {
        // Update transcription edits
        updateTranscriptionEdit();
        // Update button clicked state and colors
        updateButtonClicked(true);
        updatePrimaryColor(primaryColor);
        updateOutlineColor(outlineColor);
    }

    return (
        <>
            <div className="flex flex-col justify-around flex-1 border border-gray-300 border-solid p-1 border-1 rounded-md">
                {/* Language selection */}
                <div>
                    <div class="flex items-center gap-3 mt-6 text-white/90">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold justify-center item-center text-white-300">01</h3>
                        <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-0.5">Choose your language for <span className="text-blue-300">transcription</span>.</h3>
                    </div>
                    <CaptionsLanguageDropDown selectedLanguageCode={handleLanguageSelect} />
                </div>

                {/* Color selection */}
                <div className="flex flex-col gap-3">
                    <div class="flex items-center gap-3 mt-6 text-white/90">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold justify-center item-center text-white-300">02</h3>
                        <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-2">Edit the <span className="text-blue-300">transcription</span> below to be applied as <span className="text-blue-300">captions</span> to your video.</h3>
                    </div>
                    <div className="flex justify-around text-xl">
                        <span className="text-white/90">Primary Color: <input type="color" value={primaryColor} onChange={(ev) => setPrimaryColor(ev.target.value)} /></span>
                        <span className="text-white/90">Outline Color: <input type="color" value={outlineColor} onChange={(ev) => setOutlineColor(ev.target.value)} /></span>
                    </div>
                </div>
            </div>

            {/* Apply captions button */}
            <label onClick={applyCaptions} className="cursor-pointer inline-flex items-center justify-center bg-black hover:text-blue-300 hover:fill-blue-300 fill-white text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3 text-white">
                <CaptionIcon height={28} width={28}/>
                <span>Apply Captions</span>
            </label>
        </>
    );
};

export default CaptionsOptions;
