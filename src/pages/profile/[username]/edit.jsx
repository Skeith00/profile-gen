// pages/profile/[username]/edit.jsx
import { useState } from "react";
import { useRouter } from 'next/router';
import { profilePropType } from '@propTypes/profilePropTypes';
import AddSectionDropdown from "@components/sections/edit/generics/AddSectionDropdown";
import OptionalSectionWrapper from "@components/sections/edit/generics/OptionalSectionWrapper";
import { SECTIONS } from "@components/sections/sections";
import { TEMPLATES } from "@components/templates/templates";
import { handleValueChange } from "@components/sections/edit/utils";

export default function EditProfile({ data, username }) {
    const router = useRouter();
    const [profile, setProfile] = useState(data || {
        template: {},
        name: {},
        headline: {},
        //photo: '',
        about: {},
        email: {},
        //contacts: [],
        //skills: [],
        //projects: [],
        //testimonials: [],
        //services: [],
    });

    const [saving, setSaving] = useState(false);

    function handleRemoveSection(key) {
        const updated = { ...profile };
        delete updated[key]; // remove data
        setProfile(updated);
    }

    function handleAddSection(key) {
        setProfile((prev) => ({
            ...prev,
            [key]: {}
        }));
    }

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        const res = await fetch(`/api/profile/${username}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
        });

        setSaving(false);

        if (res.ok) {
            await router.push(`/profile/${username}/view`);
        } else {
            alert('Failed to save profile');
        }
    }

    function handleChange(key, updated) {
        setProfile((prev) => ({
            ...prev,
            [key]: updated
        }));
    }

    const handleFieldChange = (field, value) => {
        handleValueChange(profile[field], value, (update) =>
            handleChange(field, update)
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h1>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Template Dropdown */}
                <div>
                    <label className="block font-semibold text-gray-700">Template</label>
                    <select
                        className="mt-1 w-full border rounded px-3 py-2 bg-white"
                        value={profile.template?.value}
                        onChange={(e) => handleFieldChange("template", e.target.value)}
                    >
                        <option value="">-- Select a template --</option>
                        {Object.keys(TEMPLATES).map((key) => (
                            <option key={key} value={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Mandatory fields */}
                <div>
                    <label className="block font-semibold text-gray-700">Name</label>
                    <input
                        type="text"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.name?.value}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700">Headline</label>
                    <input
                        type="text"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.headline?.value}
                        onChange={(e) => handleFieldChange("headline", e.target.value)}
                    />
                </div>
                {/*<div>
                    <label className="block font-semibold text-gray-700">Photo URL</label>
                    <input
                        type="text"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.photo}
                        onChange={(e) => handleValueChange('photo', e.target.value)}
                    />
                </div>*/}
                <div>
                    <label className="block font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.email?.value}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                    />
                </div>
                {/* Dynamically load optional sections */}
                {Object.entries(SECTIONS).map(([key, { label, Component }]) =>
                    profile[key] && Component ? (
                        <OptionalSectionWrapper
                            key={key}
                            sectionKey={key}
                            label={label}
                            onRemove={handleRemoveSection}
                        >
                            {Component && (
                                <Component
                                    data={profile[key]}
                                    onChange={(update) => handleChange(key, update)}
                                />
                            )}
                        </OptionalSectionWrapper>
                    ) : null
                )}

                {/* Add section dropdown */}
                <AddSectionDropdown
                    profile={profile}
                    onAdd={(key) => handleAddSection(key)}
                />

                {/* Preview button */}
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-3"
                    onClick={() => {}}
                >
                    Preview
                </button>

                {/* Save button */}
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </form>
        </div>
    );
}

EditProfile.propTypes = {
    data: profilePropType.isRequired
}

export async function getServerSideProps(context) {
    const { username } = context.params;
    const res = await fetch(`${process.env.PUBLIC_BASE_URL}/api/profile/${username}`);

    if (!res.ok) {
        return {
            props: {
                username,
            }
        }
    }

    const data = await res.json();

    return {
        props: {
            data,
            username,
        }
    }
}
