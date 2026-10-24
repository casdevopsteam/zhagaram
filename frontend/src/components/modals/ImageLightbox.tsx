import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { ImageItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { LecturePhotoGraphic } from '../common/VisualAsset';

interface ImageLightboxProps {
  image: ImageItem | null;
  images: ImageItem[];
  onClose: () => void;
  onSelectImage: (img: ImageItem) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  image,
  images,
  onClose,
  onSelectImage,
}) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!image) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, images]);

  if (!image) return null;

  const currentIndex = images.findIndex(img => img.id === image.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectImage(images[currentIndex - 1]);
    } else {
      onSelectImage(images[images.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onSelectImage(images[currentIndex + 1]);
    } else {
      onSelectImage(images[0]);
    }
  };

  const handleDownload = () => {
    if (image.image_url && image.image_url.startsWith('/')) {
      const a = document.createElement('a');
      a.href = image.image_url;
      a.download = `${image.slug || 'zhagaram_image'}.jpg`;
      a.target = '_blank';
      a.click();
    } else {
      const title = language === 'ta' ? image.title_ta : image.title_en;
      const blob = new Blob([`Zhagaram Trust Image Archive\nTitle: ${title}\nCredit: ${image.credit || 'Zhagaram Trust'}`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${image.slug || 'zhagaram_image'}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-200">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors focus:outline-hidden"
        aria-label="Close image viewer"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden sm:block focus:outline-hidden"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden sm:block focus:outline-hidden"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div className="max-w-4xl w-full flex flex-col max-h-[90vh]">
        <div className="relative bg-[#0E1A14] rounded-t-sm overflow-hidden flex items-center justify-center p-2 min-h-[300px] md:min-h-[480px]">
          <img
            src={image.image_url}
            alt={language === 'ta' ? image.alt_text_ta || image.title_ta : image.alt_text_en || image.title_en}
            className="w-full h-full max-h-[65vh] object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('.lightbox-fallback') as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <div className="lightbox-fallback w-full h-full" style={{ display: 'none' }}>
            <LecturePhotoGraphic
              title={language === 'ta' ? image.title_ta : image.title_en}
              className="w-full h-full max-h-[60vh] object-contain"
            />
          </div>
        </div>

        {/* Captions and Metadata Bar */}
        <div className="bg-[#FAF8F5] p-4 md:p-6 rounded-b-sm border-t border-[#E8DFD5] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs text-[#786E63] mb-1">
              <span className="font-semibold text-[#C85A32] uppercase tracking-wider">
                {language === 'ta' ? image.category : image.category_en}
              </span>
              <span>·</span>
              <span>
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            <h3 className="font-tamil-serif font-bold text-lg md:text-xl text-[#19231D]">
              {language === 'ta' ? image.title_ta : image.title_en}
            </h3>
            <p className="text-xs md:text-sm text-[#5C5044] mt-1 font-serif italic">
              {language === 'ta' ? image.caption_ta : image.caption_en}
            </p>
            {image.credit && (
              <p className="text-[11px] text-[#8C8074] mt-1">
                {t('பட உரிமை:', 'Credit:')} {image.credit}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#132B20] hover:bg-[#1E3E2F] text-white text-xs font-medium rounded-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{t('பதிவிறக்கம்', 'Download')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
