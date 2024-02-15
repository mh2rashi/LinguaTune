// Import Commands from AWS SDK
import { StartTranscriptionJobCommand, GetTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";


// Function to create and return a StartTranscriptionJobCommand instance
export const createTranscriptionJobCommand = (filename) => {
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


// Function to create and return a GetObjectCommand instance
export const getObjectCommand = (filename) => {
    return new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
    });
};


// Function to create and return a GetTranscriptionJobCommand instance
export const getTranscriptionJobCommand = (filename) => {
    return new GetTranscriptionJobCommand({
        TranscriptionJobName: filename,
    });
};


// Function to create and return a PutObjectCommand instance
export const uploadCommand = ({ data, type, name }) => {
    return new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Body: data,
        ACL: 'public-read',
        ContentType: type,
        Key: name,
    });
};
