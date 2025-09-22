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
        if (!couchRes.ok) return res.status(404).json({ statusText: 'Profile not found' });
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
        if (!couchRes.ok) return res.status(500).json({ statusText: 'Profile not saved' });
        const data = await couchRes.json();
        return res.status(couchRes.status).json(data);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
