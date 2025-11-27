import React from 'react';
import InstagramIcon from './icons/InstagramIcon';
import TelegramIcon from './icons/TelegramIcon';
import MessengerIcon from './icons/MessengerIcon';
import ResetButton from './ResetButton';
import HugIntensitySlider from './HugIntensitySlider';
import RetryIcon from './icons/RetryIcon';

interface ResultDisplayProps {
  imageUrl: string;
  onReset: () => void;
  onRetry: () => void;
  hugIntensity: number;
  onIntensityChange: (value: number) => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageUrl, onReset, onRetry, hugIntensity, onIntensityChange }) => {
  const handleSave = () => {
    // Removed confirmation for a smoother one-click save.
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'hugme_result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareText = "I created this beautiful image with HugMe AI! ❤️";
  const telegramShareUrl = `https://t.me/share/url?text=${encodeURIComponent(shareText)}`;
  // Direct sharing of an image file to Messenger/Instagram chats is not possible from a web app due to browser limitations.
  // These links open the respective apps/sites, and the user is instructed to save the image first.
  const messengerUrl = `https://www.messenger.com/`;
  const instagramUrl = `https://www.instagram.com/`;

  return (
    <div className="flex flex-col items-center space-y-8 animate-fade-in w-full">
      <div className="relative group">
        <img
          src={imageUrl}
          alt="Generated hug"
          className="smooth-scaling rounded-2xl max-w-sm md:max-w-md lg:max-w-lg shadow-2xl shadow-black/50 animate-image-fade-in"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-300"></div>
      </div>
      <div className="flex flex-col items-center w-full space-y-4 max-w-xs sm:max-w-sm">
        <button
          onClick={handleSave}
          className="w-full px-8 py-3 text-lg font-semibold text-white rounded-full
            transition-all duration-500 ease-in-out
            bg-gradient-to-r from-green-500 to-teal-500
            hover:from-green-600 hover:to-teal-600
            hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]
            active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Save Image
        </button>
        
        <div className="flex flex-col items-center space-y-3 pt-4 w-full">
          <p className="text-sm text-gray-400">Share your moment:</p>
          <div className="grid grid-cols-3 gap-3 w-full">
            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white rounded-full transition-all duration-300 bg-[#2AABEE]/80 hover:bg-[#2AABEE] hover:shadow-[0_0_15px_rgba(42,171,238,0.6)] backdrop-blur-sm"
              aria-label="Share on Telegram"
              title="Share a message on Telegram"
            >
              <TelegramIcon />
              <span>Telegram</span>
            </a>
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white rounded-full transition-all duration-300 bg-[#00B2FF]/80 hover:bg-[#00B2FF] hover:shadow-[0_0_15px_rgba(0,178,255,0.6)] backdrop-blur-sm"
              aria-label="Share on Messenger"
              title="Save the image first, then share on Messenger!"
            >
              <MessengerIcon />
              <span>Messenger</span>
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white rounded-full transition-all duration-300 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-size-200 bg-pos-0 hover:bg-pos-100 backdrop-blur-sm"
              aria-label="Share on Instagram"
              title="Save the image first, then share on Instagram!"
            >
              <InstagramIcon />
              <span>Instagram</span>
            </a>
          </div>
           <p className="text-xs text-gray-500 text-center pt-2">
            To share the image, please save it first, then send it in your favorite app!
          </p>
        </div>

        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-sm text-center text-gray-300 mb-2">Want a different result?</p>
          <HugIntensitySlider value={hugIntensity} onChange={onIntensityChange} />
        </div>
        
        <div className="flex items-center justify-center gap-4 w-full pt-2">
            <button
                onClick={onRetry}
                className="flex items-center justify-center w-auto px-8 py-3 text-base font-semibold text-white rounded-full
                transition-all duration-500 ease-in-out
                bg-gradient-to-r from-blue-500 to-indigo-500
                hover:from-blue-600 hover:to-indigo-600
                hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]
                active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label="Retry generation"
            >
                <RetryIcon />
                <span className="ml-2">Try Again</span>
            </button>
            <ResetButton onClick={onReset}>Start Over</ResetButton>
        </div>
      </div>
      <style>{`
        /* This ensures the image scales smoothly without pixelation */
        .smooth-scaling {
            image-rendering: auto;
        }

        .bg-size-200 { background-size: 200% 200%; }
        .bg-pos-0 { background-position: 0% 0%; }
        .bg-pos-100 { background-position: 100% 100%; }

        @keyframes image-fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-image-fade-in {
            animation: image-fade-in 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default ResultDisplay;
