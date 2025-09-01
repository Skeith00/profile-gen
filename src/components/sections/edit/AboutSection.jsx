import EditableLabel from "@components/sections/edit/generics/EditableLabel";
import {SECTIONS} from "@components/sections/sections";
import { handleLabelChange, handleValueChange } from "@components/sections/edit/utils";
import PropTypes from "prop-types";

export default function AboutSection({ data = {}, onChange }) {

    return (
        <div className="mb-6">
            <EditableLabel
                data={data?.label}
                onChange={(newLabel) => handleLabelChange(data, newLabel, onChange)}
                defaultLabel={SECTIONS["about"]?.label || "About"}
            />
            {/*<label className="block font-semibold text-gray-700">About</label>*/}
            <textarea
                className="mt-2 w-full border rounded px-3 py-2"
                value={data.value || ""}
                onChange={(e) => handleValueChange(data, e.target.value, onChange)}
                placeholder="Write something about yourself..."
            />
        </div>
    );
}

AboutSection.propTypes = {
    data: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};