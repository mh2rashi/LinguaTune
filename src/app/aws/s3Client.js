import { S3Client } from "@aws-sdk/client-s3";

const s3Client = () => {

    return new S3Client({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
};

export default s3Client;
