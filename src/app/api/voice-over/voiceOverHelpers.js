/**
 * Generates an SSML paragraph from an array of transcription items.
 * @param {Array} transcriptionItems - An array of objects containing transcription items.
 * Each item should have 'start_time', 'end_time', and 'content' properties.
 * @returns {string} An SSML string representing the concatenated transcription items.
**/

export const generateSSMLParagraph = (transcriptionItems) => {
    // Create SSML content by mapping each transcription item to a prosody element
    const ssmlContent = transcriptionItems.map((item) => {
        // Use prosody element to control speech rate and duration based on start and end times
        const maxDuration = item.end_time - item.start_time;
        return `<prosody amazon:max-duration="${maxDuration}s">${item.content}</prosody>`;
    }).join('\n');
    
    // Enclose the SSML content within <speak> tags
    return `<speak>\n${ssmlContent}\n</speak>`;
};
