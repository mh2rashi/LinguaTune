import { GetObjectCommand } from "@aws-sdk/client-s3"

const getObjectCommand = (filename) => {

    return new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
    });
};

export default getObjectCommand;