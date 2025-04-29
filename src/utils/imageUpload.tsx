import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { UploadFile } from '@/components/forms/partner-offers-form/icons/UploadFile';
import { UploadFileGreen } from '@/components/forms/partner-offers-form/icons/UploadFIleGreen';
type ImageUploaderProps = {
  defaultImage?: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  uploadButton?: React.ReactNode;
  blurDefault?: boolean;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  defaultImage = "/icons/home/chocolate.png",
  width = 547,
  height = 244,
  className = "",
  containerClassName = "",
  uploadButton,
  blurDefault = true,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);
  const [isWhiteBackground, setIsWhiteBackground] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const checkImageBackground = () => {
      const img = document.createElement('img');
      img.crossOrigin = 'Anonymous';
      img.src = selectedImage;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 1, 1);
          const pixel = ctx.getImageData(0, 0, 1, 1).data;
          const isWhite = pixel[0] > 200 && pixel[1] > 200 && pixel[2] > 200;
          setIsWhiteBackground(isWhite);
        }
      };
      
      img.onerror = () => {
        console.error('Error loading image for background check');
        setIsWhiteBackground(false);
      };
    };

    checkImageBackground();
  }, [selectedImage]);
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const isDefaultImage = selectedImage === defaultImage;

  return (
    <div 
      className={`relative ${containerClassName}`}
      style={{ width, height }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-[15px]">
        <Image 
          src={selectedImage} 
          fill
          alt="Preview" 
          className={`object-cover ${className} ${isDefaultImage && blurDefault ? "blur-[4px]" : "blur-[4px]"}`}
          priority
        />
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      
      {uploadButton ? (
        <div onClick={handleUploadClick}>
          {uploadButton}
        </div>
      ) : (
        <button 
          onClick={handleUploadClick}
          type="button"
          aria-label="Upload image"
          className="w-[40px] h-[40px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
        >                    
          {isWhiteBackground ? (
            <UploadFileGreen className="w-full h-full" />
          ) : (
            <UploadFile className="w-full h-full" />
          )}
        </button>
      )}
    </div>
  );
};

export default ImageUploader;