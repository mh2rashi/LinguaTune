'use client';
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import cleanTranscriptionItems from "../aws/transcriptionHelpers/cleanTranscriptionItems"
import UpdateTranscriptionItems from "../aws/transcriptionHelpers/updateTranscriptionItems"
import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate"
import VoiceDropdownButton from "../../components/voiceLanguageDropDown";
import CaptionIcon from "../../components/assets/captionIcon";
import { PollyClient, StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";



export default function FilePage({ params }) {

    const filename = params.filename;
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isFetchingInfo, setIsFetchingInfo] = useState(false);
    const [activeButton, setActiveButton] = useState('captions');

    const [originalTranscriptionItems, setOriginalTranscriptionItems] = useState([])
    const [originalTranscription, setOriginalTranscription] = useState(null);

    const [currentTranscriptionItems, setCurrentTranscriptionItems] = useState([]);
    const [currentTranscription, setCurrentTranscription] = useState(null);

    const [languageCode, setLanguageCode] = useState(null);
    const [Voice, setVoice] = useState(null);




    useEffect(() => {

        getTranscription();
        

    }, [filename])

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
            OutputS3KeyPrefix: "", // Replace with your desired key prefix
            TextType: "text",
            Text: 'Hello, my name is Mirrat. I\'m 25 years old. I would like to work at the Toronto District.',
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
    }


    //const handleLanguageSelect = (selectedLanguageCode) => {

    //    // Call updateTranscription with the selected language code
    //    changeTranscriptionLanguage(selectedLanguageCode);
    //};

    const handleLanguageSelect = (onSelectLanguageCode) => {
        setLanguageCode(onSelectLanguageCode);
    };

    const handleVoiceSelect = () => {
        setVoice(onSelectVoice);
    };

  


    async function getTranscription() {
        setIsFetchingInfo(true);

        try {
            const response = await axios.get('/api/transcribe?filename=' + filename);
            setIsFetchingInfo(false);

            const status = response.data?.status;
            const transcription = response.data?.transcription;

            if (status === 'IN_PROGRESS') {
                setIsTranscribing(true);
                setTimeout(getTranscription, 5000);
            } else {
                setIsTranscribing(false);

                setCurrentTranscriptionItems(cleanTranscriptionItems(transcription.results.items));
                setOriginalTranscriptionItems(cleanTranscriptionItems(transcription.results.items));

                setCurrentTranscription(transcription.results.transcripts[0].transcript);
                setOriginalTranscription(transcription.results.transcripts[0].transcript);

            }

        } catch (error) {
            console.error('Error fetching transcription:', error);
            setIsFetchingInfo(false);
        }
    }


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
            setCurrentTranscription(response.TranslatedText);

            //Update AWS TranscriptionItems
            setCurrentTranscriptionItems(UpdateTranscriptionItems(response.TranslatedText, originalTranscriptionItems, languageCode))

        } catch (error) {
            console.error('Error translating text:', error);
            throw error;
        }
    }

  
    const updateTranscriptionEdit = (code, vc) => {

        getVoiceOver(code, vc);
        // Call your function or perform actions here
        console.log('Apply Captions button clicked!');

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

        setCurrentTranscriptionItems(updatedTranscriptionItems);

        console.log('Values:', currentTranscriptionItems);
    };

    const handleToggle = (button) => {
        setActiveButton(button);
    };


    function TranscriptionItem({ item, key}) {
        if (!item) {
            return '';
        }

        const [startValue, setStartValue] = useState(item.start_time || '');
        const [endValue, setEndValue] = useState(item.end_time || '');
        const [contentValue, setContentValue] = useState(item.content || '');

        const handleStartTimeChange = (e) => {
            const value = e.target.value;
            setStartValue(value);
        };

        const handleEndTimeChange = (e) => {
            const value = e.target.value;
            setEndValue(value);
        };

        const handleContentChange = (e) => {
            const value = e.target.value;
            setContentValue(value);
        };

        return (
            <div className="my-1 grid grid-cols-3 gap-1 items-center" style={{ gridTemplateColumns: '10% 10% 80%' }}>
                <input type="text"
                    className="bg-white/20 p-1 rounded-md sm:text-lg md:text-xl"
                    value={startValue}
                    onChange={handleStartTimeChange}
                />
                <input type="text"
                    className="bg-white/20 p-1 rounded-md sm:text-lg md:text-xl"
                    value={endValue}
                    onChange={handleEndTimeChange}
                />
                <input type="text"
                    className="bg-white/20 p-1 rounded-md sm:text-lg md:text-xl"
                    value={contentValue}
                    onChange={handleContentChange}
                />

            </div>

        );
    }



    if (isTranscribing) {

        return (

            <div>Transcribing your video...</div>

        );

    }

    if (isFetchingInfo) {

        return (

            <div>Fetching information...</div>

        );

    }



    return (

        <div className="">

            <div className="flex justify-between px-8 gap-4 mb-8">

                <div className="flex flex-col flex-1 flex-grow px-4 mt-2 gap-6">

                    <div className="flex relative rounded-full border border-white border-solid p-1 border-2">
                        {/* Black background for Captions button */}
                        {activeButton === 'captions' && (
                            <div className="absolute inset-y-0 left-0 bg-black z-10 w-1/2 text-blue-300 rounded-full transition-transform transform"></div>
                        )}
                        {/* Black background for Voice Over button */}
                        {activeButton === 'voiceover' && (
                            <div className="absolute inset-y-0 right-0 bg-black z-10 w-1/2 text-blue-300 rounded-full transition-transform transform"></div>
                        )}

                        {/* Captions button */}
                        <button
                            className={`flex-1 p-2 focus:outline-none relative z-20 rounded-full sm:text-lg md:text-xl ${activeButton === 'captions' ? 'text-blue-300' : 'text-black'
                                }`}
                            onClick={() => handleToggle('captions')}
                        >
                            Captions
                        </button>

                        {/* Voice Over button */}
                        <button
                            className={`flex-1 p-2 focus:outline-none relative z-20 rounded-full sm:text-lg md:text-xl ${activeButton === 'voiceover' ? 'text-blue-300' : 'text-black'
                                }`}
                            onClick={() => handleToggle('voiceover')}
                        >
                            Voice Over
                        </button>

                    </div>

                    <div className="flex flex-col justify-around flex-1 border border-white border-solid p-1 border-2 rounded-md">

                        <div>

                            <div class="flex items-center gap-3 mt-6">
                                <h3 class="text-2xl sm:text-3xl md:text-4xl text-slate-600 font-bold justify-center item-center">01</h3>
                                <h3 class="text-lg sm:text-xl md:text-2xl justify-center pb-0.5">Choose your language for <span className="text-blue-300">transcription</span>.</h3>
                            </div>

                            {/*<DropdownButton onSelectLanguage={handleLanguageSelect} />*/}
                            <VoiceDropdownButton
                                onSelectLanguageCode={handleLanguageSelect}
                                onSelectVoice={handleVoiceSelect}
                            />

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


                </div>


                <div className="bg-gray-800 w-[340px] h-[580px] rounded-xl shadow-md shadow-cyan-500 flex-1 overflow-hidden">

                    <video className="w-full h-full object-cover p-1 rounded-xl"
                        controls
                        src={"https://transalte-transcribe.s3.amazonaws.com/" + filename}>
                    </video>

                </div>

            </div>

            <div className="text-white bg-black border border-white border-solid p-2 border-2 grid grid-cols-3 gap-1 rounded-md" style={{ gridTemplateColumns: '10% 10% 80%' }}>

                <h1 className="text-left border-solid border-white border-1 sm:text-lg md:text-xl">Start</h1>
                <h1 className="text-left border-solid border-white border-1 sm:text-lg md:text-xl">End</h1>
                <h1 className="text-center border-solid border-white border-1 sm:text-lg md:text-xl">Content</h1>

            </div>

            {currentTranscriptionItems && (
                <div className="h-24 sm:h-auto overflow-y-auto sm:overflow-auto">
                    {currentTranscriptionItems.map((item, key) => (
                        <div key={key} id={key}>
                            <TranscriptionItem
                                item={item}
                                key={key}
                            />
                        </div>
                    ))}
                </div>
            )}

        </div>


    );

}



   
 //async function VocalizeText() {

 //       const client = new PollyClient({
 //           region: 'us-east-2',
 //           credentials: {
 //               accessKeyId: process.env.AWS_ACCESS_KEY,
 //               secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
 //           },
 //       });

 //        const input = { // DescribeVoicesInput
 //            Engine: "standard",
 //        };
         


 //       //const input = {
 //       //    "LexiconNames": [
 //       //        "example"
 //       //    ],
 //       //    "OutputFormat": "mp3",
 //       //    "SampleRate": "8000",
 //       //    "Text": "All Gaul is divided into three parts",
 //       //    "TextType": "text",
 //       //    "VoiceId": "Joanna"
 //       //};


 //       try {
 //           //const command = new SynthesizeSpeechCommand(input);
 //           //const response = await client.send(command);
 //           const command = new DescribeVoicesCommand(input);
 //           const response = await client.send(command);
 //           console.log(response);
 //       } catch (error) {
 //           console.error('Error translating text:', error);
 //           throw error;
 //       }
 //   }

