import React, { useState, useEffect, useCallback } from 'react';
import { AppState } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import GenerateButton from './components/GenerateButton';
import SmileyPreloader from './components/SmileyPreloader';
import ResultDisplay from './components/ResultDisplay';
import { generateHugImage } from './services/geminiService';
import ResetButton from './components/ResetButton';
import HugIntensitySlider from './components/HugIntensitySlider';
import ErrorIcon from './components/icons/ErrorIcon';
import AlertIcon from './components/icons/AlertIcon';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [hugIntensity, setHugIntensity] = useState<number>(50);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleReset = useCallback(() => {
    setAppState(AppState.IDLE);
    setImage1(null);
    setImage2(null);
    setGeneratedImage(null);
    setError(null);
    setResetKey(prev => prev + 1);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!image1 || !image2) {
      setError("Please upload two images to continue.");
      return;
    }
    setError(null);
    setAppState(AppState.GENERATING);
    try {
      const resultUrl = await generateHugImage(image1, image2, hugIntensity);
      setGeneratedImage(resultUrl);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during image generation.");
      setAppState(AppState.IDLE);
    }
  }, [image1, image2, hugIntensity]);

  const renderContent = () => {
    switch (appState) {
      case AppState.GENERATING:
        return <SmileyPreloader />;
      case AppState.RESULT:
        return generatedImage ? <ResultDisplay 
          imageUrl={generatedImage} 
          onReset={handleReset}
          onRetry={handleGenerate}
          hugIntensity={hugIntensity}
          onIntensityChange={setHugIntensity}
          /> : null;
      case AppState.IDLE:
      default:
        return (
          <div className="flex flex-col items-center space-y-6 animate-fade-in w-full max-w-4xl">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                Turn your imagination into reality.
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Upload two photos. Watch HugMe create a moment of warmth.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <ImageUploader key={`uploader1-${resetKey}`} id="uploader1" onImageSelect={setImage1} />
              <ImageUploader key={`uploader2-${resetKey}`} id="uploader2" onImageSelect={setImage2} />
            </div>
            <HugIntensitySlider value={hugIntensity} onChange={setHugIntensity} />
            
            {error && (
              <div className="relative w-full max-w-md p-4 my-2 text-sm text-red-200 bg-red-900/50 border border-red-500/50 rounded-lg flex items-center justify-between animate-fade-in shadow-lg shadow-red-500/10" role="alert">
                <div className="flex items-center">
                  <AlertIcon />
                  <span className="ml-3 font-medium">{error}</span>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="p-1.5 -m-1.5 text-red-200 rounded-md hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                  aria-label="Dismiss error"
                >
                  <ErrorIcon />
                </button>
              </div>
            )}

            <div className="flex flex-col items-center">
                <GenerateButton onClick={handleGenerate} isDisabled={!image1 || !image2} />
                {(image1 || image2) && !generatedImage && (
                    <div className="mt-4">
                      <ResetButton onClick={handleReset}>Clear Images</ResetButton>
                    </div>
                )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.15), transparent 80%), radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(37, 99, 235, 0.1), transparent 80%), linear-gradient(to bottom right, #0a0a0a, #000000)`
        }}
      ></div>
      <Header />
      <main className="relative flex items-center justify-center min-h-screen px-4 py-24 sm:py-20">
        {renderContent()}
      </main>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
