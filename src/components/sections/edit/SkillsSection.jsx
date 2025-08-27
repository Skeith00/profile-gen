import PropTypes from "prop-types";
import {useState} from "react";

export default function SkillsSection({data = [], onChange}) {
    const [input, setInput] = useState('');

    const handleAddSkill = () => {
        if (input.trim() && !data.includes(input.trim())) {
            const newSkills = [...data, input.trim()];
            onChange(newSkills);
            setInput('');
        }
    };

    const handleRemoveSkill = (skill) => {
        const newSkills = data.filter((s) => s !== skill);
        onChange(newSkills);
    };

    return (
        <div className="mb-6">
            {/* Input box */}
            <div className="flex gap-2 mb-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    placeholder="Add a skill..."
                    className="flex-1 p-2 border rounded-lg"
                />
                <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                >
                    Add
                </button>
            </div>

            {/* Skills as tags */}
            <div className="flex flex-wrap gap-2">
                {data.map((skill) => (
                    <span
                        key={skill}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                    {skill}
                        <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-xs font-bold hover:text-gray-200"
                        >
              ✕
            </button>
          </span>
                ))}
            </div>
        </div>
    );
}

SkillsSection.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
};