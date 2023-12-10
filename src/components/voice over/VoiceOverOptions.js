import React, { useState } from 'react'

import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate"

import VoiceOverLanguageDropDown from "../voice over/VoiceOverLanguageDropDown";
import CaptionIcon from "../assets/captionIcon";

import UpdateTranscriptionItems from "../../app/aws/transcriptionHelpers/updateTranscriptionItems"

const VoiceOverOptions = ({ originalTranscription, originalTranscriptionItems, currentTranscriptionItems, updateCurrentTranscriptionItems, updateCurrentTranscription }) => {


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

        const params = {
            SourceLanguageCode: 'auto', // Auto-detect source language
            TargetLanguageCode: languageCode,
            Text: originalTranscription,
        };

        try {
            const command = new TranslateTextCommand(params);
            const response = await translateClient.send(command);

            // Update Current Transcription
            updateCurrentTranscription(response.TranslatedText);

            //Update AWS TranscriptionItems
            updateCurrentTranscriptionItems(UpdateTranscriptionItems(response.TranslatedText, originalTranscriptionItems, languageCode));

        } catch (error) {
            console.error('Error translating text:', error);
            throw error;
        }
    }

    // Update Trascription Edit
    const updateTranscriptionEdit = () => {
        const updatedTranscriptionItems = [...currentTranscriptionItems];

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
        updateCurrentTranscriptionItems(updatedTranscriptionItems);

        console.log('Values:', updatedTranscriptionItems);
    };


    return (

        <>

            <div className="flex flex-col justify-around flex-1 border border-white border-solid p-1 border-2 rounded-md">

                <div>

                    <div class="flex items-center gap-3 mt-6">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl text-slate-600 font-bold justify-center item-center">01</h3>
                        <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-0.5">Choose your language for <span className="text-blue-300">transcription</span>.</h3>
                    </div>

                    <VoiceOverLanguageDropDown />

                </div>


                <div className="flex flex-col gap-3">

                    <div class="flex items-center gap-3 mt-6">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl text-slate-600 font-bold justify-center item-center">02</h3>
                        <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-2">Edit the <span className="text-blue-300">transcription</span> below to be applied as <span className="text-blue-300">captions</span> to your video.</h3>
                    </div>

                    <div className="flex justify-around text-xl">

                        <span>Primary Color: </span>

                        <span>Outline Color: </span>

                    </div>

                </div>


            </div>

            <label onClick={updateTranscriptionEdit} className="cursor-pointer inline-flex items-center justify-center bg-white hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3">
                <CaptionIcon />
                <span>Apply Captions</span>
            </label>

        </>

    );

};

export default VoiceOverOptions