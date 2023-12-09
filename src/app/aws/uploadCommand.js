import { PutObjectCommand } from "@aws-sdk/client-s3";

const uploadCommand = ({ data, type, name }) => {
    return new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Body: data,
        ACL: 'public-read',
        ContentType: type,
        Key: name,
    });
};

export default uploadCommand;
