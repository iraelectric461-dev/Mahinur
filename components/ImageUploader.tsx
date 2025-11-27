import React, { useState, useCallback, ChangeEvent, DragEvent } from 'react';
import UploadIcon from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  id: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, id }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files ? e.target.files[0] : null);
  };

  const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files ? e.dataTransfer.files[0] : null);
  };
  
  const baseClasses = "relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ease-in-out overflow-hidden";
  const borderClasses = `border-2 border-dashed ${isDragging ? 'border-violet-400' : 'border-white/20'}`;
  const glassmorphismClasses = "bg-white/5 backdrop-blur-sm hover:bg-white/10";
  const glowClasses = "hover:shadow-[0_0_20px_rgba(167,139,250,0.4)]";

  return (
    <div className="p-2 bg-transparent">
      <label
        htmlFor={id}
        className={`${baseClasses} ${borderClasses} ${glassmorphismClasses} ${glowClasses} group`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
        {imagePreview ? (
          <>
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md pointer-events-none">
              Ready
            </div>
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <UploadIcon />
              <p className="mt-2 text-sm font-semibold">Change Image</p>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400 p-4">
            <UploadIcon />
            <p className="mt-2 text-sm">Drop image here</p>
            <p className="text-xs text-gray-500">or click to upload</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;