import React from "react";

interface Props {
    text: string;
    onClick: () => void;
}

const ButtonCancel: React.FC<Props> = ({
    text,
    onClick,
}) => {
    return (
        <button
            type="submit"
            className="VAZGEC"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default ButtonCancel;