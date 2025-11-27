import React, { useState } from 'react';
import HeartIcon from './icons/HeartIcon';
import TelegramIcon from './icons/TelegramIcon';
import FallingHeart from './FallingHeart';

const Header: React.FC = () => {
  const [fallingHearts, setFallingHearts] = useState<{ id: number }[]>([]);

  const handleHeartClick = () => {
    const newHeartId = Date.now();
    setFallingHearts(currentHearts => [...currentHearts, { id: newHeartId }]);

    // Clean up the heart from the DOM after the animation completes
    setTimeout(() => {
      setFallingHearts(currentHearts =>
        currentHearts.filter(heart => heart.id !== newHeartId)
      );
    }, 2000); // Must match the animation duration in FallingHeart.tsx
  };

  return (
    <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="relative flex items-center space-x-2 group cursor-pointer"
          onClick={handleHeartClick}
          aria-label="Create a falling heart animation"
          role="button"
        >
          <div className="text-violet-400 filter drop-shadow-[0_0_8px_rgba(196,181,253,0.9)] transition-transform duration-300 ease-in-out group-hover:scale-110">
            <HeartIcon />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider">HugMe</h1>
          {/* Render the falling hearts */}
          {fallingHearts.map(heart => (
            <FallingHeart key={heart.id} />
          ))}
        </div>
        <a
          href="https://t.me/tell_me_sorry"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 group"
        >
          <TelegramIcon />
          <span className="group-hover:text-violet-300 transition-colors">Owner</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
