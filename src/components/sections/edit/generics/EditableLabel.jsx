import { useState } from "react";
import { Pencil } from "lucide-react"; // lucide-react icons

export default function EditableLabel({ data = "", onChange, defaultLabel }) {
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(data || "");

    const handleSave = (newLabel) => {
        onChange(newLabel)
        setEditing(false);
    };

    return (
        <div className="flex items-center gap-2">
            <label className={tempValue ? 'block font-light text-gray-600' : 'block font-semibold text-gray-700'}>{defaultLabel}</label>
            {editing ? (
                <input
                    type="text"
                    value={tempValue}
                    autoFocus
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(e.target.value);
                        if (e.key === "Escape") setEditing(false);
                    }}
                    className="border px-2 py-1 rounded"
                    //className="border border-gray-300 px-2 py-1 rounded text-sm w-full"
                />
            ) : (
                <>
                    <h2 className="text-lg font-semibold">{data}</h2>
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
