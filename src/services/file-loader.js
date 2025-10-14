async function safeFileFetch(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.error}`);
    }
    return res.json();
}

export async function handleFileChange(profile, username){
    // Step 1: Collect files
    const filesToUpload = profile.projects?.
        value?.
        filter(p => p.image instanceof File).
        map((p) => ({ projectId: profile.projects.value.indexOf(p)}));

    if (!filesToUpload?.length) {
        return profile
    }

    // Step 2: Ask backend for presigned URLs
    const { urls } = await safeFileFetch(`/api/files/${username}`, {
        method: "PUT",
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

                project.imagePath = objectName;
            } catch (err) {
                failed.push({ projectId, error: err.message });
            }
        })
    );

    if (failed.length > 0) {
        throw new Error("Some uploads failed");
    }

    return profile;
}

export async function handleFileFetching(profile, username){

    // Step 1: Collect files
    const filesToFetch = profile.projects?.value
        ?.filter(p => (!(p.image instanceof File)) && p.imagePath)
        .map((p) => ({ projectId: profile.projects.value.indexOf(p), file: p.imagePath }));


    if (!filesToFetch?.length) {
        return profile
    }

    // Step 2: Ask backend for presigned URLs
    const { urls } = await safeFileFetch(`/api/files/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: filesToFetch }),
    });

    // Step 3: Upload files
    await Promise.all(
        urls.map(async ({ projectId, getUrl }) => {
            const project = profile.projects?.value[projectId];
            if (project) {
                project.image = getUrl;
            }
        })
    );

    return profile;
}
