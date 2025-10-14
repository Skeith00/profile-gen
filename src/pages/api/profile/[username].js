import {BloomFilter as Buffer} from "next/dist/shared/lib/bloom-filter";

export default async function handler(req, res) {
     try {
        return await fetchProfile(req, res);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

async function fetchProfile(req, res) {
    const { username } = req.query;
    const url = process.env.DB_URL || `http://${process.env.DB_HOST || "localhost"}:${process.env.PORT || 5984}`;
    //const authString = Buffer.from(`${process.env.DB_USER || "admin"}:${process.env.DB_PASSWORD || "password"}`).toString("base64");
    const authString = btoa(`${process.env.DB_USER || "admin"}:${process.env.DB_PASSWORD || "password"}`); // Base64 encode the username:password
    const baseUrl = `${url}/${process.env.DB_NAME || "profiles"}/${username}`;

    let options = {
        headers: {
            Authorization: `Basic ${authString}`,
            "Content-Type": "application/json",
        },
    };

    let couchRes;

    if (req.method === "GET") {
        couchRes = await fetch(baseUrl, { ...options, method: "GET" });
        if (!couchRes.ok) {
            console.log(couchRes.statusText)
            return res.status(404).json({error: "Profile not found"})
        }
    } else if (req.method === "PUT") {
        couchRes = await fetch(baseUrl, { ...options, method: "PUT", body: JSON.stringify(req.body) });
        if (!couchRes.ok) {
            console.log(couchRes.statusText)
            throw new Error("Profile not saved")
        }
    } else if (req.method === "POST") {
        couchRes = await fetch(baseUrl, { ...options, method: "PUT", body: JSON.stringify({}) });
        if (!couchRes.ok) {
            console.log(couchRes.statusText)
            throw new Error("Profile not created")
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const data = await couchRes.json();
    return res.status(couchRes.status).json(data);
}