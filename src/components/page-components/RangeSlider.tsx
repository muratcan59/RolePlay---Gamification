import React, { useState } from "react";

interface Props {
    minVal: number,
    maxVal: number,
    step?: number,
    defaultValue?: number
}

const RangeSlider: React.FC<Props> = ({
    minVal,
    maxVal,
    step,
    defaultValue
}) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    return (
        <span>
            <label id="min">{minVal}</label>
            <input
                id="typeinp"
                type="range"
                min={minVal}
                max={maxVal}
                value={value}
                onChange={handleChange}
                step={step ?? "1"}
            />
            <label id="max">{maxVal}</label>
            <input
                type="number"
                min={minVal}
                max={maxVal}
                style={{ margin: '0 16px' }}
                value={value}
                onChange={handleChange}
            />
        </span>
    );
}

export default RangeSlider;