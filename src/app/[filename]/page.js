'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";

import cleanTranscriptionItems from "../aws/transcriptionHelpers/cleanTranscriptionItems"

import { PollyClient, StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";

import CaptionsTranscriptionEditor from "../../components/captions/CaptionsTranscriptionEditor"
import CaptionsOutputVideo from "../../components/captions/CaptionsOutputVideo"
import CaptionsOptions from "../../components/captions/CaptionsOptions"




import ToggleButton from "../../components/ToggleButton"



export default function FilePage({ params }) {

    const filename = params.filename;

    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isFetchingInfo, setIsFetchingInfo] = useState(false);

    const [activeButton, setActiveButton] = useState('captions');

    // This is for the Captions
    const [originalTranscriptionItems, setOriginalTranscriptionItems] = useState([])
    const [originalTranscription, setOriginalTranscription] = useState(null);
    const [currentTranscriptionItems, setCurrentTranscriptionItems] = useState([]);
    const [currentTranscription, setCurrentTranscription] = useState(null);

    const [languageCode, setLanguageCode] = useState(null);
    const [Voice, setVoice] = useState(null);

    useEffect(() => {

        getTranscription();


    }, [filename])

   

    // Get Transcription
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

            


    

    /* Functions to handle changes with component values */

    const handleLanguageSelect = (onSelectLanguageCode) => {
        setLanguageCode(onSelectLanguageCode);
    };

    const handleVoiceSelect = () => {
        setVoice(onSelectVoice);
    };

    

   
    /* Helper functions to render TranscriptionItems */

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

    // Functions from CaptionsOptions
    const updateCurrentTranscriptionItems = (newItems) => {
        setCurrentTranscriptionItems(newItems);
    };

    const updateCurrentTranscription = (newItems) => {
        setCurrentTranscription(newItems);
    };


    // Functions from ToggleButton
    const updateToggleButton = (newButton) => {
        setActiveButton(newButton);
        console.log(newButton);
       
    };



    return (

        <div className="">

            <div className="flex justify-between px-8 gap-4 mb-8">

                <div className="flex flex-col flex-1 flex-grow px-4 mt-2 gap-6">

                    <ToggleButton activeButton={activeButton} updateToggleButton={updateToggleButton} />

                    {activeButton == 'captions'?
                        <CaptionsOptions
                            originalTranscription={originalTranscription}
                            originalTranscriptionItems={originalTranscriptionItems}
                            currentTranscriptionItems={currentTranscriptionItems}
                            updateCurrentTranscriptionItems={updateCurrentTranscriptionItems}
                            updateCurrentTranscription={updateCurrentTranscription}
                        /> :
                        <

                </div>

                <CaptionsOutputVideo videoSource={"https://transalte-transcribe.s3.amazonaws.com/" + filename} />

            </div>

            <CaptionsTranscriptionEditor transcriptionItems={currentTranscriptionItems} />
            
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

