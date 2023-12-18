'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";

import cleanTranscriptionItems from "../aws/transcriptionHelpers/cleanTranscriptionItems"


import CaptionsTranscriptionEditor from "../../components/captions/CaptionsTranscriptionEditor"
import CaptionsOutputVideo from "../../components/captions/CaptionsOutputVideo"
import CaptionsOptions from "../../components/captions/CaptionsOptions"


import VoiceOverOptions from "../../components/voice over/VoiceOverOptions"

import ToggleButton from "../../components/ToggleButton"


export default function FilePage({ params }) {

    const filename = params.filename;

    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isFetchingInfo, setIsFetchingInfo] = useState(false);

    const [activeButton, setActiveButton] = useState('captions');

    
    const [originalTranscriptionItems, setOriginalTranscriptionItems] = useState([])
    const [originalTranscription, setOriginalTranscription] = useState(null);

    // Variables for Captions transcription
    const [currentTranscriptionItemsCaptions, setCurrentTranscriptionItemsCaptions] = useState([]);
    const [currentTranscriptionCaptions, setCurrentTranscriptionCaptions] = useState(null);
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [primaryColor, setPrimaryColor] = useState(null);
    const [outlineColor, setOutlineColor] = useState(null);

    // Variables for VoiceOver transcription
    const [currentTranscriptionItemsVoiceOver, setCurrentTranscriptionItemsVoiceOver] = useState([]);
    const [currentTranscriptionVoiceOver, setCurrentTranscriptionVoiceOver] = useState(null);


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
            setIsFetchingInfo(false);
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

   

    // Functions for VoiceOver Options
    const updateCurrentTranscriptionItemsVoiceOver = (newItems) => {
        setCurrentTranscriptionItemsVoiceOver(newItems);
    };

    const updateCurrentTranscriptionVoiceOver = (newItems) => {
        setCurrentTranscriptionVoiceOver(newItems);
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



    return (

        <div className="">

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
                        <CaptionsOptions
                            originalTranscriptionItems={originalTranscriptionItems}
                            currentTranscriptionItemsCaptions={currentTranscriptionItemsCaptions}
                            updateCurrentTranscriptionItemsCaptions={updateCurrentTranscriptionItemsCaptions}
                            updateButtonClicked={updateButtonClicked}
                            updatePrimaryColor={updatePrimaryColor}
                            updateOutlineColor={updateOutlineColor}
                        />
                        //<VoiceOverOptions
                        //    originalTranscription={originalTranscription}
                        //    originalTranscriptionItems={originalTranscriptionItems}
                        //    currentTranscriptionVoiceOver={currentTranscriptionVoiceOver}
                        //    currentTranscriptionItemsVoiceOver={currentTranscriptionItemsVoiceOver}
                        //    updateCurrentTranscriptionItemsVoiceOver={updateCurrentTranscriptionItemsVoiceOver}
                        //    updateCurrentTranscriptionVoiceOver={updateCurrentTranscriptionVoiceOver}
                        ///>
                    }
                </div>

                <CaptionsOutputVideo filename={filename} transcriptionItems={currentTranscriptionItemsCaptions} primaryColor={primaryColor} outlineColor={outlineColor} isButtonClicked={isButtonClicked} />

            </div>

            <CaptionsTranscriptionEditor transcriptionItems={currentTranscriptionItemsCaptions} />
            
        </div>

    );

}

