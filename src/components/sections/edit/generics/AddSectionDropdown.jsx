import { SECTIONS } from "@components/sections/sections";
import { PlusCircle } from "lucide-react";
import {useState} from "react";
import {TEMPLATES} from "@components/templates/templates";

export default function AddSectionDropdown({ profile, onAdd }) {
    const [selectedKey, setSelected] = useState("");
    const template = TEMPLATES[profile.template?.value].edit || { mandatory: [], optional: [] };

    const availableSections = template.optional
        .filter((key) => SECTIONS[key] && !profile[key] && SECTIONS[key].Component != null)
        .map((key) => ({ key, label: SECTIONS[key].label }));

    if (availableSections.length === 0) return null;

    const handleAdd = () => {
        if (!selectedKey) return;
        onAdd(selectedKey);
        setSelected("");
    };

    return (
        <div className="my-6 flex gap-2 items-center">
            <select
                value={selectedKey}
                onChange={(e) => setSelected(e.target.value)}
                className="border p-2 rounded-lg"
            >
                <option value="">Add a section...</option>
                {availableSections.map((section) => (
                    <option key={section.key} value={section.key}>
                        {section.label}
                    </option>
                ))}
            </select>
            <button
                type="button"
                onClick={handleAdd}
                disabled={!selectedKey}
                className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
            >
                <PlusCircle className="w-4 h-4" />
                Add
            </button>
        </div>
    );
}
