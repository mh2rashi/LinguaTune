/**
 * The below JavaScript code defines a set of functions to create and check the status of transcription
 * jobs using the AWS Transcribe service, and retrieve the transcription file once the job is
 * completed.
 * @param filename - The `filename` parameter is a string that represents the name of the file for
 * which the transcription job is being created or checked.
 * @returns The code is returning a JSON response. If a ready transcription file is found, it returns a
 * response with the status "COMPLETED" and the transcription content. If a transcription job is
 * already in progress, it returns a response with the status of the existing job. If there is no
 * existing job, it creates a new transcription job and returns a response with the status of the new
 * job. If none
**/

// Import client and commands from AWS SDK
import { transcribeClient, s3Client } from "../aws/clients";
import { createTranscriptionJobCommand, getTranscriptionJobCommand, getObjectCommand } from "../aws/commands";

// Function to create a transcription job
async function createTranscriptionJob(filename) {
    // Create a Transcribe client
    const myTranscribeClient = transcribeClient();
    // Create a transcription job command
    const transcriptionCommand = createTranscriptionJobCommand(filename);
    // Send the transcription job command
    return myTranscribeClient.send(transcriptionCommand);
}

// Function to check if a transcription job exists
async function checkJobExists(filename) {
    // Create a Transcribe client
    const myTranscribeClient = transcribeClient();
    let jobStatusResult = null;
    try {
        // Get transcription job status command
        const transcriptionJobStatusCommand = getTranscriptionJobCommand(filename);
        // Send the transcription job status command
        jobStatusResult = await myTranscribeClient.send(transcriptionJobStatusCommand);
    } catch (e) {
        console.log("Error at CheckJobExists");
    }
    return jobStatusResult;
}

// Function to convert stream to string
async function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        stream.on('error', reject);
    });
}

// Function to get the transcription file
async function getTranscriptionFile(filename) {
    const transcriptionFileName = filename + '.transcription';
    // Create an S3 client
    const S3Client = s3Client();
    // Get object command for transcription file
    const GetObjectCommand = getObjectCommand(transcriptionFileName);
    let transcriptionFileResponse = null;
    try {
        // Send the get object command to S3
        transcriptionFileResponse = await S3Client.send(GetObjectCommand);
    } catch (error) {
        console.error('Error in createTranscriptionJob:', error);
    }
    if (transcriptionFileResponse) {
        // Parse and return the transcription file content
        return JSON.parse(await streamToString(transcriptionFileResponse.Body));
    }
    return null;
}

// Handler function for GET requests
export async function GET(req) {
    // Get filename from URL query parameter
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const filename = searchParams.get('filename');
    // Find ready transcription
    const transcription = await getTranscriptionFile(filename);
    if (transcription) {
        return Response.json({
            status: 'COMPLETED',
            transcription,
        });
    }
    // Check if already transcribing
    const existingJob = await checkJobExists(filename);
    if (existingJob) {
        return Response.json({
            status: existingJob.TranscriptionJob.TranscriptionJobStatus,
        });
    }
    // Create new transcription job if not already transcribing
    if (!existingJob) {
        const newJob = await createTranscriptionJob(filename);
        return Response.json({
            status: newJob.TranscriptionJob.TranscriptionJobStatus,
        });
    }
    return Response.json(null);
}
