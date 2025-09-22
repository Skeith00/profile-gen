export const handleFileChange = async (profile, username) => {
    // Step 1: Collect files
    const filesToUpload = profile.projects?.
        value?.
        filter(p => p.image instanceof File).
        map((p, index) => ({ projectId: index}));

    if (!filesToUpload?.length) {
        return
    }

    // Step 2: Ask backend for presigned URLs
    const { urls } = await safeFetch(`/api/files/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: filesToUpload }),
    });

    const failed = [];

    // Step 3: Upload files
    await Promise.all(
        urls.map(async ({ projectId, objectName, putUrl }) => {
            const project = profile.projects.value[projectId];
            const file = project.image;

            try {
                const uploadResponse = await fetch(putUrl, {
                    method: "PUT",
                    body: file,
                    headers: { "Content-Type": file.type },
                });

                if (!uploadResponse.ok) {
                    failed.push({ projectId, status: uploadResponse.status });
                    return;
                }

                project.image = objectName;
            } catch (err) {
                failed.push({ projectId, error: err.message });
            }
        })
    );

    if (failed.length > 0) {
        throw new Error("Some uploads failed");
    }

    return profile;
};