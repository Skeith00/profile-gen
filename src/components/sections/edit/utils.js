
export const handleLabelChange = (data, newLabel, onChange) => {
    onChange({
        ...data,
        label: newLabel
    });
};

export const handleValueChange = (data, newValue, onChange) => {
    onChange({
        ...data,
        value: newValue
    });
};
