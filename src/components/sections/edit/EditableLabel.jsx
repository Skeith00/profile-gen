import { useState } from "react";
import { Pencil } from "lucide-react"; // lucide-react icons

export default function EditableLabel({ sectionKey, profile, setProfile, defaultLabel }) {
    const [editing, setEditing] = useState(false);
    const label = profile[sectionKey]?.label

    const handleSave = (newLabel) => {
        changeLabel(newLabel)
        setEditing(false);
    };


    const changeLabel = (newLabel) => {
        if (!newLabel.trim()) {
            // delete the label from the section
            const { label, ...rest } = profile[sectionKey];

            setProfile({
                ...profile,
                [sectionKey]: rest
            });
        } else {
            // update or set the label
            setProfile({
                ...profile,
                [sectionKey]: {
                    ...profile[sectionKey],
                    label: newLabel
                }
            });
        }
    };

    return (
        <div className="flex items-center gap-2">
            <label className={label ? 'block font-light text-gray-600' : 'block font-semibold text-gray-700'}>{defaultLabel}</label>
            {editing ? (
                <input
                    type="text"
                    value={label}
                    autoFocus
                    onChange={(e) => changeLabel(e.target.value)}
                    onBlur={() => setEditing(false)} // exit edit mode when leaving
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(e.target.value);
                        if (e.key === "Escape") setEditing(false);
                    }}
                    className="border border-gray-300 px-2 py-1 rounded text-sm w-full"
                />
            ) : (
                <>
                    <h2 className="text-lg font-semibold">{label}</h2>
                    <button
                        type="button"
                        onClick={() => setEditing(true)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Pencil size={16} />
                    </button>
                </>
            )}
        </div>
    );
}
