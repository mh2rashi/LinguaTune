import React, { useState, useEffect } from 'react'

import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate"
import { PollyClient, StartSpeechSynthesisTaskCommand, DescribeVoicesCommand } from "@aws-sdk/client-polly";


import VoiceOverLanguageDropDown from "../voice over/VoiceOverLanguageDropDown";
import VoiceOverIcon from "../assets/VoiceOverIcon"


const VoiceOverOptions = ({ originalTranscriptionItems, currentTranscriptionItemsVoiceOver, updateCurrentTranscriptionItemsVoiceOver, updateApplyVoiceOverClicked, updateAudioFile }) => {

    const [selectedLanguageCode, setSelectedLanguageCode] = useState(null);
    const [selectedVoiceOver, setSelectedVoiceOver] = useState(null);


    useEffect(() => {

        changeTranscriptionLanguage("en");

    }, []);


    // Call updateTranscription with the selected language code
    const handleLanguageSelect = (languageCode) => {

        setSelectedLanguageCode(languageCode);
        changeTranscriptionLanguage(languageCode);
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

            let updateTranscriptionItemsVoiceOver = originalTranscriptionItems;


            // Update each transcription item with the corresponding sentence
            translatedItems.map((item, index) => {
                // Check if there is a corresponding sentence in newText
                updateTranscriptionItemsVoiceOver[index].content = item;

            });

            console.log(updateTranscriptionItemsVoiceOver);

            updateCurrentTranscriptionItemsVoiceOver(updateTranscriptionItemsVoiceOver);

        } catch (error) {
            console.error('Error during translation:', error);
            // Handle the error appropriately.
        }
    }

    // Helper function to generate SSML paragraph
    const generateSSMLParagraph = (transcriptionItems) => {
        const ssmlContent = transcriptionItems.map((item) => `<prosody amazon:max-duration="${item.end_time - item.start_time}s" >${item.content}</prosody>`).join('\n');
        return `<speak>\n${ssmlContent}\n</speak>`;
    };

    // Get Voice Over
    async function getVoiceOver(transcriptionItems) {
        const client = new PollyClient({
            region: "us-east-2",
            credentials: {
                accessKeyId: "AKIAZSN4PXGW7UO5YVIY",
                secretAccessKey: "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",
            },
        });

        const text = generateSSMLParagraph(transcriptionItems);

        const input = {
            Engine: "standard",
            LanguageCode: "en-US",
            OutputFormat: "mp3",
            OutputS3BucketName: "transalte-transcribe", // Replace with your bucket name
            OutputS3KeyPrefix: "",
            TextType: "ssml",
            Text: text,
            VoiceId: 'Salli',
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

        console.log('Values:', updatedTranscriptionItems);

        console.log('Voice:',selectedVoiceOver);

        getVoiceOver(updatedTranscriptionItems);

    };

   
    const applyVoiceOver = () => {

       // updateTranscriptionEdit();
        updateApplyVoiceOverClicked(true);
        

    };



    return (

        <>

            <div className="flex flex-col justify-around flex-1 border border-gray-500 border-solid p-1 rounded-md">

                <div>

                    <div class="flex items-center gap-3 mt-6 text-white/90">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl text-slate-600 font-bold justify-center item-center text-gray-300">01</h3>
                        <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-0.5">Choose your language and preferred voice for <span className="text-blue-300">voice-over</span>.</h3>
                    </div>

                    <VoiceOverLanguageDropDown selectedLanguageCode={handleLanguageSelect} selectedVoiceOver={handleVoiceOver} />

                </div>


                <div className="flex flex-col gap-3 text-white/90">

                    <div class="flex items-center gap-3 mt-6">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl text-slate-600 font-bold justify-center item-center text-gray-300">02</h3>
                        <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-2">Edit the <span className="text-blue-300">transcription</span> below to be applied as <span className="text-blue-300">voice over</span> to your video.</h3>
                    </div>

                </div>


            </div>

            <label onClick={applyVoiceOver} className="cursor-pointer inline-flex items-center justify-center bg-black hover:text-blue-300 hover:fill-blue-300 fill-white text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-5 py-3 group rounded-full text-slate-950 space-x-3 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="bi bi-megaphone-fill" viewBox="0 0 16 16">
                <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.14 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z" />
            </svg>
                <span>Apply Voice Over</span>
            </label>

        </>

    );

};

export default VoiceOverOptions

