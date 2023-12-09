import { GetTranscriptionJobCommand } from "@aws-sdk/client-transcribe"

const getTranscriptionJobCommand = (filename) => {

    return new GetTranscriptionJobCommand({
        TranscriptionJobName: filename,
    });
};

export default getTranscriptionJobCommand;