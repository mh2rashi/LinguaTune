import { TranscribeClient } from "@aws-sdk/client-transcribe"


const transcribeClient = () => {

    return new TranscribeClient({

        region: 'us-east-2',
        credentials: {

            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },

    });
};

export default transcribeClient;