/**
 * The FilePage component handles the rendering of the page for a specific file, including
 * the transcription process, display of transcription options, and video output.
 * @param {Object} params - The parameters passed to the component, containing the filename.
 * @returns {JSX.Element} The JSX structure representing the FilePage component.
**/

'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";
import {cleanTranscriptionItems} from "../api/transcription/transcriptionHelpers";

// Captions Component imports
import CaptionsTranscriptionEditor from "../../components/captions/CaptionsTranscriptionEditor";
import CaptionsOutputVideo from "../../components/captions/CaptionsOutputVideo";
import CaptionsOptions from "../../components/captions/CaptionsOptions";

// VoiceOver Component imports
import VoiceOverTranscriptionEditor from "../../components/voice over/VoiceOverTranscriptionEditor";
import VoiceOverOutputVideo from "../../components/voice over/VoiceOverOutputVideo";
import VoiceOverOptions from "../../components/voice over/VoiceOverOptions";

// Toggle Component import
import ToggleButton from "../../components/homepage/ToggleButton";

// Animation imports
import Lottie from "lottie-react";
import transcribeAnimation from "../../assets/animations/transcribeAnimation";

export default function FilePage({ params }) {
    const filename = params.filename;

    // State for transcription status and active button
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [activeButton, setActiveButton] = useState('captions');

    // State for original transcription items and transcription text
    const [originalTranscriptionItems, setOriginalTranscriptionItems] = useState([]);
    const [originalTranscription, setOriginalTranscription] = useState(null);

    // State for captions transcription
    const [currentTranscriptionItemsCaptions, setCurrentTranscriptionItemsCaptions] = useState([]);
    const [currentTranscriptionCaptions, setCurrentTranscriptionCaptions] = useState(null);
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [primaryColor, setPrimaryColor] = useState(null);
    const [outlineColor, setOutlineColor] = useState(null);
    const [keyCaptions, setKeyCaptions] = useState(0);

    // State for voice over transcription
    const [currentTranscriptionItemsVoiceOver, setCurrentTranscriptionItemsVoiceOver] = useState([]);
    const [currentTranscriptionVoiceOver, setCurrentTranscriptionVoiceOver] = useState(null);
    const [isApplyVoiceOverClicked, setApplyVoiceOverClicked] = useState(false);
    const [keyVoiceOver, setKeyVoiceOver] = useState(0);
    const [audioFile, setAudioFile] = useState(null);

    // Fetch transcription data on component mount
    useEffect(() => {
        getTranscription();
    }, [filename]);

    // Fetch transcription data from backend
    async function getTranscription() {
        setIsTranscribing(true);

        try {
            const response = await axios.get('/api/transcription?filename=' + filename);
            const status = response.data?.status;
            const transcription = response.data?.transcription;

            if (status === 'IN_PROGRESS') {
                setIsTranscribing(true);
                setTimeout(getTranscription, 5000); // Poll every 5 seconds if transcription is in progress
            } else {
                setIsTranscribing(false);

                // Set original transcription data
                setOriginalTranscription(transcription.results.transcripts[0].transcript);
                setOriginalTranscriptionItems(cleanTranscriptionItems(transcription.results.items));

                // Set captions transcription data
                setCurrentTranscriptionCaptions(transcription.results.transcripts[0].transcript);
                setCurrentTranscriptionItemsCaptions(cleanTranscriptionItems(transcription.results.items));

                // Set voice over transcription data
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
        console.log("Audio File:", audioFile);

    }

    // Functions for VoiceOverOutputVideo
    const resetApplyVoiceOverClicked = (boolean) => {
        setApplyVoiceOverClicked(boolean);
        console.log('Button reset: ' + boolean);
    };

    // Render loading animation if transcription is in progress
    if (isTranscribing) {
        return (
            <div className="text-center flex flex-col items-center">
                <Lottie animationData={transcribeAnimation}/>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                <div className="flex flex-col flex-1 px-4 mt-2 gap-6">
                    <ToggleButton activeButton={activeButton} updateToggleButton={updateToggleButton} />
                    {activeButton == 'captions' ?
                        <CaptionsOptions
                            originalTranscriptionItems={originalTranscriptionItems}
                            currentTranscriptionItemsCaptions={currentTranscriptionItemsCaptions}
                            updateCurrentTranscriptionItemsCaptions={updateCurrentTranscriptionItemsCaptions}
                            updateButtonClicked={setButtonClicked}
                            updatePrimaryColor={setPrimaryColor}
                            updateOutlineColor={setOutlineColor}
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
                    <CaptionsOutputVideo
                        filename={filename}
                        transcriptionItems={currentTranscriptionItemsCaptions}
                        primaryColor={primaryColor}
                        outlineColor={outlineColor}
                        isButtonClicked={isButtonClicked}
                        resetButtonClicked={setButtonClicked}
                    /> :
                    <VoiceOverOutputVideo
                        filename={filename}
                        audioFile={audioFile}
                        isApplyVoiceOverClicked={isApplyVoiceOverClicked}
                        resetApplyVoiceOverClicked={updateApplyVoiceOverClicked}
                    />
                }
            </div>
            {activeButton == 'captions' ?
                <CaptionsTranscriptionEditor
                    uniqueKeyCaptions={keyCaptions}
                    transcriptionItems={currentTranscriptionItemsCaptions}
                /> :
                <VoiceOverTranscriptionEditor
                    uniqueKeyVoiceOver={keyVoiceOver}
                    transcriptionItems={currentTranscriptionItemsVoiceOver}
                />
            }
        </div>
    );
}
