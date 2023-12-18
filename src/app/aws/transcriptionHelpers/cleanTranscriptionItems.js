export default function cleanTranscriptionItems(items) {

    // Fix items with spaces and input periods.
    items.forEach((item, key) => {
        if (!item.start_time) {
            const prev = items[key - 1];
            if (prev) {
                prev.alternatives[0].content += item.alternatives[0].content;
                delete items[key];
            }
        }
    });

    let condensedTranscription = [];
    let currentSentence = { text: "", startTime: null, endTime: null };

    items.forEach((item, key) => {
        if (item && item.type === "pronunciation") {
            if (currentSentence.text === "") {
                currentSentence.startTime = item.start_time;
            }

            let currentString = item.alternatives[0].content;
            let lastCharacter = currentString.charAt(currentString.length - 1);

            if (lastCharacter === "." || currentSentence.text.length >= 85) {
                currentSentence.text += currentString;
                currentSentence.endTime = item.end_time;
                condensedTranscription.push({ ...currentSentence });
                currentSentence = { text: "", startTime: null, endTime: null };
            } else {
                currentSentence.text += currentString + " ";
                currentSentence.endTime = item.end_time;
            }
        }
    });

    return condensedTranscription.map(item => {
        const start_time = item.startTime;
        const end_time = item.endTime;
        const content = item.text;
        return { start_time, end_time, content }
    });

}



