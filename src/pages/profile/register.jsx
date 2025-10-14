import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterProfile() {
    const router = useRouter();
    const [profileName, setProfileName] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(e){
        e.preventDefault();
        setLoading(true);

        try {
            const resGet = await fetch(`/api/profile/${profileName}`);
            if (resGet.status !== 404) {
                console.log("Redirecting to edit")
                await router.push(`/profile/${profileName}/edit`);
            }
            const resPost = await fetch(`/api/profile/${profileName}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!resPost.ok) {
                throw new Error("Failed to register profile");
            }
            console.log("Redirecting to edit")
            await router.push(`/profile/${profileName}/edit`);
        } catch (err) {
            console.error(err);
            return {
                redirect: {
                    destination: "/error/_error",
                    permanent: false,
                },
            };
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Register New Profile
                </h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label
                            htmlFor="profileName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Profile Name
                        </label>
                        <input
                            id="profileName"
                            type="text"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            placeholder="Enter profile name"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg text-white font-medium 
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}