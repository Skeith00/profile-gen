import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function ContactsSection({ data = [], onChange }) {
    const [contacts, setContacts] = useState(data);

    const handleAdd = () => {
        const updated = [...contacts, { type: "", url: "" }];
        setContacts(updated);
        onChange(updated);
    };

    const handleRemove = (index) => {
        const updated = contacts.filter((_, i) => i !== index);
        setContacts(updated);
        onChange(updated);
    };

    const handleChange = (index, field, value) => {
        const updated = contacts.map((contact, i) =>
            i === index ? { ...contact, [field]: value } : contact
        );
        setContacts(updated);
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            {contacts.map((contact, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 border rounded-lg p-3 bg-gray-50"
                >
                    {/* Type field */}
                    <input
                        type="text"
                        placeholder="Type (e.g., LinkedIn, GitHub, Email)"
                        value={contact.type}
                        onChange={(e) => handleChange(index, "type", e.target.value)}
                        className="flex-1 border rounded-lg px-3 py-2 text-sm"
                    />

                    {/* URL field */}
                    <input
                        type="text"
                        placeholder="URL (e.g., https://linkedin.com/...)"
                        value={contact.url}
                        onChange={(e) => handleChange(index, "url", e.target.value)}
                        className="flex-1 border rounded-lg px-3 py-2 text-sm"
                    />

                    {/* Remove button */}
                    <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="p-2 rounded-lg hover:bg-red-50"
                    >
                        <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                </div>
            ))}

            {/* Add button */}
            <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
                <Plus className="w-4 h-4" />
                Add Contact
            </button>
        </div>
    );
}