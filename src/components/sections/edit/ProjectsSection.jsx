import { useState } from "react";
import { handleValueChange } from "@components/sections/edit/utils";
import PropTypes from "prop-types";
import { projectPropType } from "@propTypes/profilePropTypes";

export default function ProjectsSection({ data = {}, onChange }) {
    const [projects, setProjects] = useState(data.value || []);

    const handleAdd = () => {
        const updated = [...projects, { name: "", description: "", link: "" , image: "" }];
        setProjects(updated);
        handleValueChange(data, updated, onChange);
    };

    const handleRemove = (index) => {
        const updated = projects.filter((_, i) => i !== index);
        setProjects(updated);
        handleValueChange(data, updated, onChange);
    };

    const handleChange = (index, field, value) => {
        const updated = projects.map((project, i) =>
            i === index ? { ...project, [field]: value } : project
        );
        setProjects(updated);
        handleValueChange(data, updated, onChange);
    };

    const handleFileChange = async (index, file) => {
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


    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{data.label}</h3>

            {projects.map((project, index) => (
                <div
                    key={index}
                    className="border rounded-lg p-4 mb-3 flex flex-col gap-2 bg-gray-50"
                >
                    <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                        placeholder="Project name"
                        className="p-2 border rounded-lg"
                    />
                    <textarea
                        value={project.description}
                        onChange={(e) => handleChange(index, "description", e.target.value)}
                        placeholder="Project description"
                        className="p-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        value={project.link}
                        onChange={(e) => handleChange(index, "link", e.target.value)}
                        placeholder="Project link"
                        className="p-2 border rounded-lg"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        className="p-2 border rounded-lg"
                    />
                    {project.image && (
                        <img
                            src={project.image}
                            alt={`${project.name || "Project"} preview`}
                            className="w-32 h-32 object-cover rounded-md border"
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="text-red-600 text-sm self-end hover:underline"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAdd}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
            >
                Add Project
            </button>
        </div>
    );
}

ProjectsSection.propTypes = {
    data: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.arrayOf(projectPropType)
    }),
    onChange: PropTypes.func.isRequired
};
