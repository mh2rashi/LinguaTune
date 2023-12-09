import transcribeClient from "../../aws/transcribeClient"
import createTranscriptionJobCommand from "../../aws/createTranscriptionJobCommand"
import getTranscriptionJobCommand from "../../aws/getTranscriptionJobCommand"
import s3Client from "../../aws/s3Client"
import getObjectCommand from "../../aws/getObjectCommand"


async function createTranscriptionJob(filename) {

    const myTranscribeClient = transcribeClient();
    const transcriptionCommand = createTranscriptionJobCommand(filename);
    return myTranscribeClient.send(transcriptionCommand);

}

async function checkJobExists(filename) {

    const myTranscribeClient = transcribeClient();

    let jobStatusResult = null;

    try {
        const transcriptionJobStatusCommand = getTranscriptionJobCommand(filename);

        jobStatusResult = await myTranscribeClient.send(
            transcriptionJobStatusCommand
        );
    } catch (e) {console.log("Error at CheckJobExists") }


    return jobStatusResult;
}

async function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        stream.on('error', reject);
    });
}

async function getTranscriptionFile(filename) {

    const transcriptionFileName = filename + '.transcription';

    const S3Client = s3Client();

    const GetObjectCommand = getObjectCommand(transcriptionFileName);

    let transcriptionFileResponse = null;

    try {
        transcriptionFileResponse = await S3Client.send(GetObjectCommand);
    } catch (error) {
        console.error('Error in createTranscriptionJob:', error);
    }

    if (transcriptionFileResponse) {
        return JSON.parse(
            await streamToString(transcriptionFileResponse.Body)
        );
    }

    return null;
}

export async function GET(req) {

    // Get filename from URL and parse it
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

        })

    }

    // Create new transcription job
    if (!existingJob) {
        const newJob = await createTranscriptionJob(filename);

        return Response.json({

            status: newJob.TranscriptionJob.TranscriptionJobStatus,

        })

    }

    return Response.json(null);

}