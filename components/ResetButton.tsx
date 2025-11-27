import React from 'react';
import ResetIcon from './icons/ResetIcon';

interface ResetButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center px-6 py-2 text-sm font-semibold text-gray-300 bg-white/5 border border-white/10 rounded-full
            hover:bg-white/10 hover:text-white transition-all duration-300
            active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
            aria-label="Reset action"
        >
            <ResetIcon />
            <span className="ml-2">{children}</span>
        </button>
    );
};

export default ResetButton;
