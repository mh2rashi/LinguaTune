/**
 * This file contains a function to handle POST requests for uploading files to AWS S3.
 * It utilizes s3Client and uploadCommand to interact with AWS S3, and uniqid to generate unique file names.
 * @param {Request} req - The request object containing the file to upload.
 * @returns {Response} A JSON response containing information about the uploaded file.
 * If an error occurs during the upload process, it returns a JSON response with an error message and a 500 status code.
**/

// Import AWS SDK command and client
import {s3Client} from "../aws/clients";
import {uploadCommand} from "../aws/commands";

// Import uniqid for unique file name
import uniqid from 'uniqid';

export async function POST(req) {
    try {
        // File Data
        const formData = await req.formData();
        const file = formData.get('file');
        const { name, type } = file;
        const data = await file.arrayBuffer();

        // Unique name for file
        const id = uniqid();
        const ext = name.split('.').pop();
        const uniqueName = `${id}.${ext}`;

        // Upload the file to AWS S3
        const client = s3Client();
        const command = uploadCommand({ data, type, name: uniqueName });

        await client.send(command);

        // Return response with file information
        return Response.json({ name, ext, uniqueName, id });
    } catch (error) {
        console.error('Error uploading file:', error);
        return Response.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
