export default async function handler(req, res) {
    const { username } = req.query;
    //const url = process.env.DB_URL || `http://${process.env.DB_USER || "admin"}:${process.env.DB_PASSWORD || "password"}@${process.env.DB_HOST || "localhost"}:${process.env.PORT || 5984}`;
    const url = process.env.DB_URL || `http://${process.env.DB_HOST || "localhost"}:${process.env.PORT || 5984}`;
    const authString = btoa(`${process.env.DB_USER || "admin"}:${process.env.DB_PASSWORD || "password"}`); // Base64 encode the username:password

    if (req.method === "GET") {
        const couchRes = await fetch(`${url}/${process.env.DB_NAME || "profiles"}/${username}`, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${authString}`,
                "Content-Type": "application/json",
            },
        });
        if (!couchRes.ok) return res.status(404).json({ error: 'Profile not found' });
        const data = await couchRes.json();
        return res.status(couchRes.status).json(data);
    }

    if (req.method === "PUT") {
        const couchRes = await fetch(`${url}/${process.env.DB_NAME || "profiles"}/${username}`, {
            method: "PUT",
            headers: {
                "Authorization": `Basic ${authString}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        });
        const data = await couchRes.json();
        return res.status(couchRes.status).json(data);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}

const handleFiles = async (index, file) => {
    if (!file) return;

    try {
        // Example: send file to backend for upload
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const { url } = await res.json(); // backend should return { url: "https://..." }

        // Save URL into project.image
        handleChange(index, "image", url);
    } catch (err) {
        console.error("File upload error:", err);
    }
};
