import React from "react";

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full shadow-md flex items-center space-x-2"
    >
        <span className="text-xl">＋</span>
        <span>{children}</span>
    </button>
);