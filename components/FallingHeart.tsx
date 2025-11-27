import React from 'react';

const FallingHeart: React.FC = () => {
    return (
        <div className="falling-heart" aria-hidden="true">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
            >
                <path
                    d="M12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364 4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364z"
                />
            </svg>
            <style>{`
                .falling-heart {
                    position: absolute;
                    top: 0;
                    left: -4px; /* Adjust to center under the main icon */
                    z-index: -1; /* Fall behind the main icon */
                    color: rgba(196, 181, 253, 0.6); /* Violet shadow color */
                    filter: drop-shadow(0 0 8px rgba(196, 181, 253, 0.8));
                    animation: fall-and-fade 2s ease-out forwards;
                    pointer-events: none; /* Ensure it doesn't block clicks */
                }

                @keyframes fall-and-fade {
                    0% {
                        transform: translateY(0) scale(0.8);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(150px) scale(1.2);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default FallingHeart;
