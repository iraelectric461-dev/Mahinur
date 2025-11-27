import React from 'react';

const SmileyPreloader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-white text-center w-full h-80">
            <div className="smiley-container">
                <div className="smiley-spinner"></div>
                <div className="smiley-face">
                    <div className="smiley-eye smiley-eye--left"></div>
                    <div className="smiley-eye smiley-eye--right"></div>
                    <div className="smiley-mouth"></div>
                </div>
            </div>
            <p className="mt-8 text-xl tracking-widest animate-pulse">Crafting your hug...</p>
            <style>{`
                /* CSS variables for theming */
                .smiley-container {
                    --fg-h: 250; /* Hue for violet */
                    --fg-s: 93%; /* Saturation */
                    --fg-l: 85%; /* Lightness (violet-300) */
                    --dur: 3s; /* Animation duration */
                    --size: 10em;
                }

                .smiley-container {
                    width: var(--size);
                    height: var(--size);
                    font-size: 1.5rem; /* ~24px, makes the preloader about 240px */
                    position: relative;
                }

                /* The rotating spinner part */
                .smiley-spinner {
                    position: absolute;
                    inset: 0;
                    border: 0.25em solid transparent;
                    border-top-color: hsl(var(--fg-h), var(--fg-s), var(--fg-l));
                    border-radius: 50%;
                    animation:
                        spinner-rotate 0.8s linear infinite,
                        spinner-fade var(--dur) ease-in-out infinite;
                }

                /* The static smiley face part */
                .smiley-face {
                    position: absolute;
                    inset: 0;
                    animation: face-fade var(--dur) ease-in-out infinite;
                }

                .smiley-eye,
                .smiley-mouth {
                    position: absolute;
                }
                .smiley-eye {
                    background-color: hsl(var(--fg-h), var(--fg-s), var(--fg-l));
                    border-radius: 50%;
                    top: 2.5em;
                    width: 1.5em;
                    height: 1.5em;
                }
                .smiley-eye--left {
                    left: 2.5em;
                }
                .smiley-eye--right {
                    right: 2.5em;
                }
                .smiley-mouth {
                    border: 0.25em solid hsl(var(--fg-h), var(--fg-s), var(--fg-l));
                    border-radius: 50%;
                    border-top-color: transparent;
                    border-right-color: transparent;
                    border-left-color: transparent;
                    top: 2.5em;
                    left: 2.5em;
                    width: 5em;
                    height: 5em;
                }

                /* Animations */
                @keyframes spinner-rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spinner-fade {
                    0%, 40% { opacity: 1; }
                    60%, 100% { opacity: 0; }
                }

                @keyframes face-fade {
                    0%, 50% { opacity: 0; transform: scale(0.8); }
                    60%, 90% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0.8); }
                }
            `}</style>
        </div>
    );
};

export default SmileyPreloader;
