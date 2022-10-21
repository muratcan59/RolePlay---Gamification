import React from "react";

interface Props {
    text: string;
    onClick?: () => void;
}

const ButtonRed: React.FC<Props> = ({
    text,
    onClick,
}) => {
    return (
        <button
            type="submit"
            className="RB"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default ButtonRed;