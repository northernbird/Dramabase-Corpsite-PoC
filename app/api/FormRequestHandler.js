import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';

const saveToS3 = async (type, reqInfo) => {

    const s3Client = new S3Client({});

    const uploadCommand = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        //File time uses current timestamp (to make each file unique)
        Key: `${type}-${Date.now()}.txt`,
        Body: reqInfo,
    });

    return s3Client.send(uploadCommand);

}

/**
 * Save submitted form data to S3
 * TODO: Form data contains some privacy information (e.g. name, email etc..), so better to encode contents
 *       instead of saving as plain text.
 */
export default async function FormRequestHandler(type, reqInfo) {

    let message = "OK";
    let responseStatus = 200;

    try {

        await saveToS3(type, reqInfo);

    } catch (e) {
        console.error("Submit was failed due to the error.", e);
        message = "Failed to submit form data!";
        //Wrap as internal server error (for now)
        responseStatus = 500;
    }

    return new Response(JSON.stringify({message}), {
        status: responseStatus,
    })

}