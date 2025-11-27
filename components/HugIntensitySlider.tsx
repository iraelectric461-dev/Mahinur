import React from 'react';

interface HugIntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const HugIntensitySlider: React.FC<HugIntensitySliderProps> = ({ value, onChange }) => {
  const getIntensityLabel = (val: number): string => {
    if (val < 33) return 'Gentle';
    if (val <= 67) return 'Warm';
    return 'Tight';
  };
  
  const intensityLabel = getIntensityLabel(value);
  const progress = (value / 100) * 100;

  return (
    <div className="w-full max-w-sm p-4 space-y-3">
      <div className="flex justify-between items-center text-sm text-gray-300">
        <label htmlFor="hug-intensity" className="font-semibold tracking-wide">Hug Intensity</label>
        <span className="font-bold text-violet-300 bg-violet-500/10 px-2 py-1 rounded-md">{intensityLabel}</span>
      </div>
      <div className="relative">
        <input
          id="hug-intensity"
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer range-slider"
          style={{ '--progress': `${progress}%` } as React.CSSProperties}
          aria-label="Hug intensity slider"
        />
      </div>
       <div className="flex justify-between text-xs text-gray-500">
        <span>Gentle</span>
        <span>Warm</span>
        <span>Tight</span>
      </div>
      <style>{`
        .range-slider {
            background-image: linear-gradient(to right, #a78bfa ${progress}%, rgba(255, 255, 255, 0.1) ${progress}%);
            transition: background 0.3s ease-in-out;
        }
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #c4b5fd;
          cursor: pointer;
          border: 3px solid #1e1b4b;
          box-shadow: 0 0 10px rgba(167, 139, 250, 0.7);
          transition: background .2s ease-in-out;
        }
        .range-slider::-webkit-slider-thumb:hover {
          background: #a78bfa;
        }
        .range-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #c4b5fd;
          cursor: pointer;
          border: 3px solid #1e1b4b;
          box-shadow: 0 0 10px rgba(167, 139, 250, 0.7);
        }
        .range-slider::-moz-range-thumb:hover {
            background: #a78bfa;
        }
      `}</style>
    </div>
  );
};

export default HugIntensitySlider;
