import React from "react";

interface Props {
    text: string;
    onClick?: () => void;
}

const ButtonGreen: React.FC<Props> = ({
    text,
    onClick,
}) => {
    return (
        <button
            type="submit"
            className="YB"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default ButtonGreen;