// Import S3Client, TranscribeClient, TranslateClient, PollyClient from AWS SDK
import { S3Client } from "@aws-sdk/client-s3";
import { TranscribeClient } from "@aws-sdk/client-transcribe";
import { TranslateClient } from "@aws-sdk/client-translate";
import { PollyClient } from "@aws-sdk/client-polly";

// Function to create and return an S3 client instance
export const s3Client = () => {
    // Create and return an S3 client with provided configuration
    return new S3Client({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.MY_AWS_ACCESS_KEY,
            secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        },
    });
};

// Function to create and return a Transcribe client instance
export const transcribeClient = () => {
    // Create and return a Transcribe client with provided configuration
    return new TranscribeClient({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.MY_AWS_ACCESS_KEY,
            secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        },
    });
};

// Function to create and return a Translate client instance
export const translateClient = () => {
    // Create and return a Translate client with provided configuration
    return new TranslateClient({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.MY_AWS_ACCESS_KEY,
            secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        },
    });
};

// Function to create and return a Translate client instance
export const pollyClient = () => {
    // Create and return a Translate client with provided configuration
    return new PollyClient({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.MY_AWS_ACCESS_KEY,
            secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        },
    });
};
