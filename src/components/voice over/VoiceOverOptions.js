import React, { useState } from 'react'

import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate"
import { PollyClient, StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";


import VoiceOverLanguageDropDown from "../voice over/VoiceOverLanguageDropDown";
import VoiceOverIcon from "../assets/VoiceOverIcon"


import UpdateTranscriptionItems from "../../app/aws/transcriptionHelpers/updateTranscriptionItems"

const VoiceOverOptions = ({ originalTranscription, originalTranscriptionItems, currentTranscriptionVoiceOver, currentTranscriptionItemsVoiceOver, updateCurrentTranscriptionItemsVoiceOver, updateCurrentTranscriptionVoiceOver }) => {

    const [selectedLanguageCode, setSelectedLanguageCode] = useState(null);
    const [selectedVoiceOver, setSelectedVoiceOver] = useState(null);

    // Call updateTranscription with the selected language code
    const handleLanguageSelect = (languageCode) => {

        setSelectedLanguageCode(languageCode);
        changeTranscriptionLanguage(selectedLanguageCode);
    };

    const handleVoiceOver = (voiceOver) => {

        setSelectedVoiceOver(voiceOver);
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
            updateCurrentTranscriptionVoiceOver(response.TranslatedText);

            //Update AWS TranscriptionItems
            updateCurrentTranscriptionItemsVoiceOver(UpdateTranscriptionItems(response.TranslatedText, originalTranscriptionItems, languageCode));

        } catch (error) {
            console.error('Error translating text:', error);
            throw error;
        }
    }

    function updateTranscriptionEdit() {
        const updatedTranscriptionItems = [...currentTranscriptionItemsVoiceOver];

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
        updateCurrentTranscriptionItemsVoiceOver(updatedTranscriptionItems);

        // Generate SSML paragraph and update the transcription
        updateCurrentTranscriptionVoiceOver(generateSSMLParagraph(updatedTranscriptionItems));
    };

    // Helper function to generate SSML paragraph
    const generateSSMLParagraph = (transcriptionItems) => {
        const ssmlContent = transcriptionItems.map((item) => `<s>${item.content}</s>`).join('\n');
        return `<speak>\n${ssmlContent}\n</speak>`;
    };

    // Get Voice Over
    async function getVoiceOver(languageCode, Voice) {
        const client = new PollyClient({
            region: "us-east-2",
            credentials: {
                accessKeyId: "AKIAZSN4PXGW7UO5YVIY",
                secretAccessKey: "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",
            },
        });

        const input = {
            Engine: "standard",
            LanguageCode: languageCode,
            OutputFormat: "mp3",
            OutputS3BucketName: "transalte-transcribe", // Replace with your bucket name
            OutputS3KeyPrefix: "",
            TextType: "ssml",
            Text: currentTranscriptionVoiceOver,
            VoiceId: Voice,
        };

        try {
            const command = new StartSpeechSynthesisTaskCommand(input);
            const response = await client.send(command);

            console.log("Task submitted successfully!");
            console.log("Task ID:", response.SynthesisTask?.TaskId);
        } catch (error) {
            console.error("Error submitting synthesis task:", error);
        }
    };

    const createVoiceOver = () => {

        updateTranscriptionEdit();
        getVoiceOver(selectedLanguageCode, selectedVoiceOver);

    };



    return (

        <>

            <div className="flex flex-col justify-around flex-1 border border-white border-solid p-1 border-2 rounded-md">

                <div>

                    <div class="flex items-center gap-3 mt-6">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl text-slate-600 font-bold justify-center item-center">01</h3>
                        <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-0.5">Choose your language and preferred voice for <span className="text-blue-300">voice over</span>.</h3>
                    </div>

                    <VoiceOverLanguageDropDown selectedLanguageCode={handleLanguageSelect} selectedVoiceOver={handleVoiceOver} />

                </div>


                <div className="flex flex-col gap-3">

                    <div class="flex items-center gap-3 mt-6">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl text-slate-600 font-bold justify-center item-center">02</h3>
                        <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-2">Edit the <span className="text-blue-300">transcription</span> below to be applied as <span className="text-blue-300">voice over</span> to your video.</h3>
                    </div>

                </div>


            </div>

            <label onClick={createVoiceOver} className="cursor-pointer inline-flex items-center justify-center bg-white hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3">
                <VoiceOverIcon />
                <span>Apply Voice Over</span>
            </label>

        </>

    );

};

export default VoiceOverOptions