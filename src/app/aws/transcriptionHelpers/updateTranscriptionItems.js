
const languagePeriods = {
    "af": ".",
    "sq": ".",
    "am": ".",
    "ar": ".",
    "hy": ".",
    "auto": ".",
    "az": ".",
    "bn": ".",
    "bs": ".",
    "bg": ".",
    "fr-CA": ".",
    "ca": ".",
    "zh": "。",
    "zh-TW": "。",
    "hr": ".",
    "cs": ".",
    "da": ".",
    "fa-AF": ".",
    "nl": ".",
    "en": ".",
    "et": ".",
    "fi": ".",
    "fr": ".",
    "ka": ".",
    "de": ".",
    "el": ".",
    "gu": ".",
    "ht": ".",
    "ha": ".",
    "he": ".",
    "hi": "।",
    "hu": ".",
    "is": ".",
    "id": ".",
    "ga": ".",
    "it": ".",
    "ja": "。",
    "kn": ".",
    "kk": ".",
    "ko": "。",
    "lv": ".",
    "lt": ".",
    "mk": ".",
    "ms": ".",
    "ml": ".",
    "mt": ".",
    "mr": ".",
    "es-MX": ".",
    "mn": ".",
    "no": ".",
    "ps": ".",
    "fa": ".",
    "pl": ".",
    "pt-PT": ".",
    "pt": ".",
    "pa": ".",
    "ro": ".",
    "ru": ".",
    "sr": ".",
    "si": ".",
    "sk": ".",
    "sl": ".",
    "so": ".",
    "es": ".",
    "sw": ".",
    "sv": ".",
    "tl": ".",
    "ta": ".",
    "te": ".",
    "th": "。",
    "tr": ".",
    "uk": ".",
    "ur": "۔",
    "uz": ".",
    "vi": ".",
    "cy": "."
};


export default function updateTranscriptionItems(newText, transcriptionItems, targetPeriod) {

    // Split the newText into sentences
    let sentences = newText.split(languagePeriods[targetPeriod]);

    // Remove empty strings from the array
    let NewSentences = sentences.filter(sentence => sentence.trim() !== '');

    

    // Update each transcription item with the corresponding sentence
    const updatedTranscriptionItems = transcriptionItems.map((item, index) => {
        // Check if there is a corresponding sentence in newText
        if (NewSentences[index]) {
            return {
                start_time: item.start_time,
                end_time: item.end_time,
                content: NewSentences[index],
            };
        }
        
    });

    return updatedTranscriptionItems;

}
