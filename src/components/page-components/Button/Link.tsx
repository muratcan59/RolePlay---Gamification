import React from "react";

interface Props {
    text: string;
    to: string
}

const ButtonLink: React.FC<Props> = ({
    text,
    to,
}) => {
    return (
        <a
            href={to}
        >
            <button
                type="submit"
                className="BY"
            >
                {text}
            </button>
        </a>
    );
}

export default ButtonLink;