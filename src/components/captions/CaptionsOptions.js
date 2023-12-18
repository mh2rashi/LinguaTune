import React, { useState } from 'react'

import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate"

import CaptionsLanguageDropDown from "../captions/CaptionsLanguageDropDown";
import CaptionIcon from "../assets/captionIcon";



const CaptionsOptions = ({ originalTranscriptionItems, currentTranscriptionItemsCaptions, updateCurrentTranscriptionItemsCaptions, updateButtonClicked, updatePrimaryColor, updateOutlineColor }) => {

    const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
    const [outlineColor, setOutlineColor] = useState('#000000');

    // Call updateTranscription with the selected language code
    const handleLanguageSelect = (selectedLanguageCode) => {

        changeTranscriptionLanguage(selectedLanguageCode);
    };



    // Change Transcription Language
    async function changeTranscriptionLanguage(languageCode) {
        const translateClient = new TranslateClient({
            region: 'us-east-2',
            credentials: {
                accessKeyId: "AKIAZSN4PXGW7UO5YVIY",
                secretAccessKey: "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",
            },
        });

        try {
            const translatedItems = await Promise.all(
                originalTranscriptionItems.map(async (item) => {
                    const params = {
                        SourceLanguageCode: 'auto', // Auto-detect source language
                        TargetLanguageCode: languageCode,
                        Text: item.content,
                    };

                    try {
                        const command = new TranslateTextCommand(params);
                        const response = await translateClient.send(command);

                        return response.TranslatedText;
                    } catch (error) {
                        console.error('Error translating text:', error);
                        throw error;
                    }
                })
            );

            let updateTranscriptionItemsCaptions = originalTranscriptionItems;


            // Update each transcription item with the corresponding sentence
            translatedItems.map((item, index) => {
                // Check if there is a corresponding sentence in newText
                updateTranscriptionItemsCaptions[index].content = item;

            });

            console.log(updateTranscriptionItemsCaptions);

            updateCurrentTranscriptionItemsCaptions(updateTranscriptionItemsCaptions);

        } catch (error) {
            console.error('Error during translation:', error);
            // Handle the error appropriately.
        }
    }


    
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

        // Use the callback function to update the state in the parent component
        updateCurrentTranscriptionItemsCaptions(updatedTranscriptionItems);

        console.log('Values:', updatedTranscriptionItems);
    };

    const applyCaptions = () => {

        updateTranscriptionEdit();

        updateButtonClicked(true);
        updatePrimaryColor(primaryColor);
        updateOutlineColor(outlineColor);
        
    }


    return (

        <>

            <div className="flex flex-col justify-around flex-1 border border-white border-solid p-1 border-2 rounded-md">

                <div>

                    <div class="flex items-center gap-3 mt-6">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl text-slate-600 font-bold justify-center item-center">01</h3>
                        <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-0.5">Choose your language for <span className="text-blue-300">transcription</span>.</h3>
                    </div>

                    <CaptionsLanguageDropDown selectedLanguageCode={handleLanguageSelect} />

                </div>


                <div className="flex flex-col gap-3">

                    <div class="flex items-center gap-3 mt-6">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl text-slate-600 font-bold justify-center item-center">02</h3>
                        <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-2">Edit the <span className="text-blue-300">transcription</span> below to be applied as <span className="text-blue-300">captions</span> to your video.</h3>
                    </div>

                    <div className="flex justify-around text-xl">

                        <span>Primary Color: <input type="color"
                            value={primaryColor}
                            onChange={(ev) => setPrimaryColor(ev.target.value)} /></span>

                        <span>Outline Color: <input type="color"
                            value={outlineColor}
                            onChange={(ev) => setOutlineColor(ev.target.value)}
                            
                        /></span>

                    </div>

                </div>


            </div>

            <label onClick={applyCaptions} className="cursor-pointer inline-flex items-center justify-center bg-white hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3">
                <CaptionIcon />
                <span>Apply Captions</span>
            </label>

        </>

    );

};

export default CaptionsOptions
