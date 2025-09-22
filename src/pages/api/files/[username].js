import { minioClient } from "@lib/minioClient";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { username } = req.query;
    const { bucket = "profiles", files } = req.body; // files = [{ projectId, filename }]

    try {
        const urls = await Promise.all(
            files.map(async ({ projectId }) => {
                const uniqueName = generateUniqueName()
                const objectName = `project/${uniqueName}`;
                const path = `${username}/${objectName}`;
                const putUrl = await minioClient.presignedPutObject(bucket, path, 60 * 5); // 5 min expiry
                //const getUrl = await minioClient.presignedGetObject(bucket, path, 60 * 60 * 24); // 24h expiry
                return { projectId, objectName, putUrl };
            })
        );

        res.status(200).json({ urls });
    } catch (err) {
        console.error("Error creating presigned URLs:", err);
        res.status(500).json({ error: "Failed to create presigned URLs" });
    }
}

const generateUniqueName = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base 36 for shorter string
    const randomNumber = Math.random().toString(36).slice(2, 8); // Extract a random alphanumeric string
    return `${timestamp}-${randomNumber}`;
};