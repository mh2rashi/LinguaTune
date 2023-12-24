'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";

import cleanTranscriptionItems from "../aws/transcriptionHelpers/cleanTranscriptionItems"


import CaptionsTranscriptionEditor from "../../components/captions/CaptionsTranscriptionEditor"
import CaptionsOutputVideo from "../../components/captions/CaptionsOutputVideo"
import CaptionsOptions from "../../components/captions/CaptionsOptions"


import VoiceOverTranscriptionEditor from "../../components/voice over/VoiceOverTranscriptionEditor"
import VoiceOverOutputVideo from "../../components/voice over/VoiceOverOutputVideo"
import VoiceOverOptions from "../../components/voice over/VoiceOverOptions"

import ToggleButton from "../../components/ToggleButton"

import Lottie from "lottie-react"
import transcribeAnimation from "../../components/assets/transcribeAnimation"

export default function FilePage({ params }) {

    const filename = params.filename;

    const [isTranscribing, setIsTranscribing] = useState(false);

    const [activeButton, setActiveButton] = useState('captions');

    
    const [originalTranscriptionItems, setOriginalTranscriptionItems] = useState([])
    const [originalTranscription, setOriginalTranscription] = useState(null);

    // Variables for Captions transcription
    const [currentTranscriptionItemsCaptions, setCurrentTranscriptionItemsCaptions] = useState([]);
    const [currentTranscriptionCaptions, setCurrentTranscriptionCaptions] = useState(null);
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [primaryColor, setPrimaryColor] = useState(null);
    const [outlineColor, setOutlineColor] = useState(null);
    const [keyCaptions, setKeyCaptions] = useState(0);

    // Variables for VoiceOver transcription
    const [currentTranscriptionItemsVoiceOver, setCurrentTranscriptionItemsVoiceOver] = useState([]);
    const [currentTranscriptionVoiceOver, setCurrentTranscriptionVoiceOver] = useState(null);
    const [isApplyVoiceOverClicked, setApplyVoiceOverClicked] = useState(false);
    const [keyVoiceOver, setKeyVoiceOver] = useState(0);
    const [audioFile, setAudioFile] = useState(null);

    

    useEffect(() => {

        getTranscription();

    }, [filename])

   
    // Get Transcription
    async function getTranscription() {
        setIsTranscribing(true);

        try {
            const response = await axios.get('/api/transcribe?filename=' + filename)

            const status = response.data?.status;
            const transcription = response.data?.transcription;

            if (status === 'IN_PROGRESS') {
                setIsTranscribing(true);
                setTimeout(getTranscription, 5000);
            } else {
                setIsTranscribing(false);

                // Original Transcription
                setOriginalTranscription(transcription.results.transcripts[0].transcript);
                setOriginalTranscriptionItems(cleanTranscriptionItems(transcription.results.items));

                // Captions Transcription
                setCurrentTranscriptionCaptions(transcription.results.transcripts[0].transcript);
                setCurrentTranscriptionItemsCaptions(cleanTranscriptionItems(transcription.results.items));

                // VoiceOver Transcription
                setCurrentTranscriptionVoiceOver(transcription.results.transcripts[0].transcript);
                setCurrentTranscriptionItemsVoiceOver(cleanTranscriptionItems(transcription.results.items));

            }

        } catch (error) {
            console.error('Error fetching transcription:', error);
            
        }
    }

    // Functions for ToggleButton
    const updateToggleButton = (newButton) => {
        setActiveButton(newButton);
        console.log(newButton);

    };

    // Functions for Captions Options
    const updateCurrentTranscriptionItemsCaptions = (newItems) => {
        setCurrentTranscriptionItemsCaptions(newItems);
        setKeyCaptions((prevKey) => prevKey + 1);
    };

    const updateButtonClicked = (boolean) => {
        setButtonClicked(boolean);
        console.log('Button Clicked')
    };

    const updatePrimaryColor = (color) => {
        setPrimaryColor(color);
        console.log(color)
    };

    const updateOutlineColor = (color) => {
        setOutlineColor(color);
        console.log(color);
    };

    // Functions for CaptionsOutputVideo
    const resetButtonClicked = (boolean) => {
        setButtonClicked(boolean);
        console.log('Button reset')
    };

   
    // Functions for VoiceOver Options
    const updateCurrentTranscriptionItemsVoiceOver = (newItems) => {
        setCurrentTranscriptionItemsVoiceOver(newItems)
        setKeyVoiceOver((prevKey) => prevKey + 1);

    };

    const updateApplyVoiceOverClicked = (boolean) => {
        setApplyVoiceOverClicked(boolean);
        console.log(boolean);
    };

    const updateAudioFile = (file) => {
        setAudioFile(file);
        console.log(file);

    }

    // Functions for VoiceOverOutputVideo
    const resetApplyVoiceOverClicked = (boolean) => {
        setApplyVoiceOverClicked(boolean);
        console.log('Button reset: ' + boolean);
    };

    
    /* Helper functions to render TranscriptionItems */

    if (isTranscribing) {

        return (

            <div className="text-center flex flex-col items-center">
                <Lottie animationData={transcribeAnimation} />
            </div>

        );

    }



    return (

        <div className="mb-20">

            <div className="flex justify-between px-8 gap-4 mb-8">

                <div className="flex flex-col flex-1 flex-grow px-4 mt-2 gap-6">

                    <ToggleButton activeButton={activeButton} updateToggleButton={updateToggleButton} />

                    {activeButton == 'captions' ?
                        <CaptionsOptions
                            originalTranscriptionItems={originalTranscriptionItems}
                            currentTranscriptionItemsCaptions={currentTranscriptionItemsCaptions}
                            updateCurrentTranscriptionItemsCaptions={updateCurrentTranscriptionItemsCaptions}
                            updateButtonClicked={updateButtonClicked}
                            updatePrimaryColor={updatePrimaryColor}
                            updateOutlineColor={updateOutlineColor}
                        /> :

                        <VoiceOverOptions
                            originalTranscriptionItems={originalTranscriptionItems}
                            currentTranscriptionItemsVoiceOver={currentTranscriptionItemsVoiceOver}
                            updateCurrentTranscriptionItemsVoiceOver={updateCurrentTranscriptionItemsVoiceOver}
                            updateApplyVoiceOverClicked={updateApplyVoiceOverClicked}
                            updateAudioFile={updateAudioFile}
                        />
                    }
                    
                </div>

                {activeButton == 'captions' ?
                    <CaptionsOutputVideo filename={filename} transcriptionItems={currentTranscriptionItemsCaptions} primaryColor={primaryColor} outlineColor={outlineColor} isButtonClicked={isButtonClicked} resetButtonClicked={resetButtonClicked} />
                    :
                    <VoiceOverOutputVideo filename={filename} audioFile={audioFile} isApplyVoiceOverClicked={isApplyVoiceOverClicked} resetApplyVoiceOverClicked={resetApplyVoiceOverClicked} /> 
                 }


            </div>

            {activeButton == 'captions' ?
                <CaptionsTranscriptionEditor uniqueKeyCaptions={keyCaptions} transcriptionItems={currentTranscriptionItemsCaptions} />
                :
                <VoiceOverTranscriptionEditor uniqueKeyVoiceOver={keyVoiceOver}  transcriptionItems={currentTranscriptionItemsVoiceOver} />
             }
            
        </div>

    );

}

