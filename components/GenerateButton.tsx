import React from 'react';

interface GenerateButtonProps {
    onClick: () => void;
    isDisabled: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isDisabled }) => {
    const buttonClasses = `
        px-10 py-4 text-lg font-semibold text-white rounded-full
        transition-all duration-500 ease-in-out
        bg-gradient-to-r from-violet-500 to-blue-500
        focus:outline-none focus:ring-4 focus:ring-violet-300
    `;

    const enabledClasses = `
        hover:from-violet-600 hover:to-blue-600
        hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]
        active:scale-95
    `;

    const disabledClasses = `
        opacity-50 cursor-not-allowed
    `;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`${buttonClasses} ${isDisabled ? disabledClasses : enabledClasses}`}
        >
            Generate Hug
        </button>
    );
};

export default GenerateButton;
