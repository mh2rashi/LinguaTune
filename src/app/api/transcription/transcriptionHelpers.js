/**
 * The cleanTranscriptionItems function in JavaScript merges incomplete sentences and condenses long
 * sentences in a transcription.
 * @param items - An array of transcription items. Each item has the following properties:
 * @returns The code snippet does not explicitly state what is being returned. However, based on the
 * function names and the comments within the code, it can be inferred that the
 * `cleanTranscriptionItems` function returns an array of cleaned transcription items, the
 * `transcriptionItemsToSrt` function returns a string in SubRip Text (SRT) format, and the
 * `toFFmpegColor` function
**/

// Clean up the transcription items by merging incomplete sentences and condensing long sentences
export function cleanTranscriptionItems(items) {

    items.forEach((item, key) => {
        // Check if the item has no start time
        if (!item.start_time) {
            const prev = items[key - 1];
            if (prev) {
                // Merge content with the previous item
                prev.alternatives[0].content += item.alternatives[0].content;
                // Remove the current item
                delete items[key];
            }
        }
    });

    // Condense long sentences into smaller chunks
    let condensedTranscription = [];
    let currentSentence = { text: "", startTime: null, endTime: null };

    // Iterate through the items to condense sentences
    items.forEach((item, key) => {
        if (item && item.type === "pronunciation") {
            // Check if the current sentence is empty
            if (currentSentence.text === "") {
                currentSentence.startTime = item.start_time;
            }

            // Get the current word
            let currentString = item.alternatives[0].content;
            // Get the last character of the current word
            let lastCharacter = currentString.charAt(currentString.length - 1);

            // Check if the last character is a period or if the sentence length exceeds a limit
            if (lastCharacter === "." || currentSentence.text.length >= 85) {
                // Add the current word to the sentence
                currentSentence.text += currentString;
                currentSentence.endTime = item.end_time;
                // Push the condensed sentence to the transcription
                condensedTranscription.push({ ...currentSentence });
                // Reset the current sentence
                currentSentence = { text: "", startTime: null, endTime: null };
            } else {
                // Add the current word to the sentence with a space
                currentSentence.text += currentString + " ";
                currentSentence.endTime = item.end_time;
            }
        }
    });

    // Map condensed items to the required format
    return condensedTranscription.map(item => {
        const start_time = item.startTime;
        const end_time = item.endTime;
        const content = item.text;
        return { start_time, end_time, content };
    });
}

// Convert seconds to HH:MM:SS.MS format
export function secondsToHHMMSSMS(timeString) {
    const d = new Date(parseFloat(timeString) * 1000);
    return d.toISOString().slice(11, 23).replace('.', ',');
}

// Convert transcription items to SubRip Text (SRT) format
export function transcriptionItemsToSrt(items) {
    let srt = '';
    let i = 1;
    items.filter(item => !!item).forEach(item => {
        // Sequence number
        srt += i + "\n";
        // Timestamps
        const { start_time, end_time } = item; // 52.345
        // Format the timestamps to HH:MM:SS.MS format
        srt += secondsToHHMMSSMS(start_time) + ' --> ' + secondsToHHMMSSMS(end_time) + "\n";

        // Content
        // Add the content of the transcription item
        srt += item.content + "\n";
        // Add a newline to separate each item
        srt += "\n";
        i++;
    });
    // Return the SRT formatted transcription
    return srt;
}

// Convert RGB color to FFmpeg format
export function toFFmpegColor(rgb) {
    const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
    return '&H' + bgr + '&';
}
