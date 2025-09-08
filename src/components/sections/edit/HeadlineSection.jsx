import PropTypes from "prop-types";
import { handleValueChange } from "@components/sections/edit/utils";

export default function HeadlineSection({ data = {}, onChange }) {
    const handleChange = (value) => {
        handleValueChange(data, value, onChange)
    };

    return (
        <div>
            <label className="block font-semibold text-gray-700">Headline</label>
            <input
                type="text"
                className="mt-1 w-full border rounded px-3 py-2"
                value={data?.value || ""}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    )
}

HeadlineSection.propTypes = {
    headline: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }),
    onChange: PropTypes.func.isRequired,
};
