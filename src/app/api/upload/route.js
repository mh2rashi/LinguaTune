import s3Client from "../../aws/s3Client";
import uploadCommand from "../../aws/uploadCommand";
import uniqid from 'uniqid';

export async function POST(req) {
    // File Data
    const formData = await req.formData();
    const file = formData.get('file');
    const { name, type } = file;
    const data = await file.arrayBuffer();

    // Unique name for file
    const id = uniqid();
    const ext = name.split('.').slice(-1)[0];
    const uniqueName = id + '.' + ext;

    // Now we upload the file to AWS S3
    const client = s3Client();
    const command = uploadCommand({ data, type, name: uniqueName });

    await client.send(command);

    return Response.json({ name, ext, uniqueName, id });
}
