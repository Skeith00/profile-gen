// lib/minioClient.js
import Minio from "minio";

export const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || "localhost",
    port: parseInt(process.env.MINIO_PORT, 10) || 9000,
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

// Generate a presigned URL for uploading
export async function getUploadUrl(bucket, objectName, expiry = 60) {
    return minioClient.presignedPutObject(bucket, objectName, expiry);
}

// Generate a presigned URL for downloading
export async function getDownloadUrl(bucket, objectName, expiry = 24 * 60 * 60) {
    return minioClient.presignedGetObject(bucket, objectName, expiry);
}

// Delete file
export async function deleteFile(bucket, objectName) {
    return minioClient.removeObject(bucket, objectName);
}

// Delete file
export async function bucketExists(bucket) {
    // Check if the bucket exists
    // If it doesn't, create it
    const exists = await  minioClient.bucketExists(bucket)
    if (exists) {
        console.log('Bucket ' + bucket + ' exists.')
    } else {
        await minioClient.makeBucket(bucket, 'us-east-1')
        console.log('Bucket ' + bucket + ' created in "us-east-1".')
    }
}

