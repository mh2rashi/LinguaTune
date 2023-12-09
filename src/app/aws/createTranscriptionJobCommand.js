import { StartTranscriptionJobCommand} from "@aws-sdk/client-transcribe"



const createTranscriptionJobCommand = (filename) => {

    return new StartTranscriptionJobCommand({

        TranscriptionJobName: filename,
        OutputBucketName: process.env.BUCKET_NAME,
        OutputKey: filename + '.transcription',
        IdentifyLanguage: true,
        Media: {

            MediaFileUri: 's3://' + process.env.BUCKET_NAME + '/' + filename,

        },

    });
};

export default createTranscriptionJobCommand;