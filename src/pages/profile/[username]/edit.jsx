// pages/profile/[username]/edit.jsx
import {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import { profilePropType } from '@propTypes/profilePropTypes';
import AddSectionDropdown from "@components/sections/edit/generics/AddSectionDropdown";
import CollapsibleSectionWrapper from "@components/sections/edit/generics/CollapsibleSectionWrapper";
import { SECTIONS } from "@components/sections/sections";
import { TEMPLATES } from "@components/templates/templates";
import { handleValueChange } from "@components/sections/edit/utils";
import { handleFileChange } from "@services/file-loader";

export default function EditProfile({ data, username }) {
    const router = useRouter();
    const [profile, setProfile] = useState(data || {
        template: {},
    });
    const [template, setTemplate] = useState(data?.template || "")
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const template = TEMPLATES[profile.template?.value]?.edit || { mandatory: [], optional: [] };
        setTemplate(template)
    }, [profile.template?.value])

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

    async function handleSave(e){
        e.preventDefault();
        setSaving(true);

        try {
            let tmpProfile = await handleFileChange(profile, username)
            setProfile(tmpProfile)
            const sanitizedProfile = {
                ...tmpProfile,
                projects: Array.isArray(tmpProfile.projects?.value)
                    ? { value: tmpProfile.projects.value.map(({ image, ...rest }) => rest) }
                    : {},
            };
            await fetch(`/api/profile/${username}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sanitizedProfile)
            });
            await router.push(`/profile/${username}/view`);
        } catch (err) {
            console.error("Save error:", err);
            //alert(err.message || "Failed to save profile");
            await router.push({
                pathname: '/error/_error',
                query: { statusCode: 500 },
            });
        } finally {
            setSaving(false);
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
                    <label htmlFor="template" className="block font-semibold text-gray-700">Template</label>
                    <select
                        id="template"
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
                {template?.mandatory?.map((key) => {
                    const SectionComponent = SECTIONS[key]?.Component;
                    const label = SECTIONS[key]?.label;
                    const collapsible = SECTIONS[key]?.collapsible;

                    if (!SectionComponent) return null;

                    return collapsible ? (
                        <CollapsibleSectionWrapper
                            key={key}
                            sectionKey={key}
                            label={label}
                        >
                            <SectionComponent
                                data={profile[key] || {}}
                                onChange={(update) => handleChange(key, update)}
                            />
                        </CollapsibleSectionWrapper>
                    ) : (
                        <SectionComponent
                            key={key}
                            data={profile[key] || {}}
                            onChange={(update) => handleChange(key, update)}
                        />
                    );
                })}
                {/*<div>
                    <label className="block font-semibold text-gray-700">Photo URL</label>
                    <input
                        type="text"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.photo}
                        onChange={(e) => handleValueChange('photo', e.target.value)}
                    />
                </div>*/}
                {/* Dynamically load sections */}
                {template?.optional?.map((key) => {
                    const SectionComponent = SECTIONS[key]?.Component;
                    const label = SECTIONS[key]?.label;
                    const collapsible = SECTIONS[key]?.collapsible;

                    if (!SectionComponent || !profile[key]) return null;

                    return collapsible ? (
                        <CollapsibleSectionWrapper
                            key={key}
                            sectionKey={key}
                            label={label}
                            onRemove={handleRemoveSection}
                        >
                            <SectionComponent
                                data={profile[key]}
                                onChange={(update) => handleChange(key, update)}
                            />
                        </CollapsibleSectionWrapper>
                    ) : (
                        <SectionComponent
                            key={key}
                            data={profile[key]}
                            onChange={(update) => handleChange(key, update)}
                        />
                    )
                })}
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
    try {
        const res = await fetch(`${process.env.PUBLIC_BASE_URL}/api/profile/${username}`);
        if (res.status === 404) {
            return {
                redirect: {
                    destination: "/profile/register",
                    permanent: false,
                },
            };
        }
        if (!res.ok) {
            throw new Error(`Failed to fetch profile: ${res.status}`);
        }
        const data = await res.json();
        /*if (!data) {
            return { notFound: true }; // Show 404 page if data is missing
        }*/
        return {
            props: {
                data: data || { template: {} },
                username,
            }
        }
    } catch (err) {
        console.error("Error fetching profile:", err);
        return {
            redirect: {
                destination: "/error/_error",
                permanent: false,
            },
        };
    }

}
