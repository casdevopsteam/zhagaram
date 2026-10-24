import React from 'react';
import { ArrowRight, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { ImageItem } from '../../types';
import { LecturePhotoGraphic } from '../common/VisualAsset';

interface GalleryPreviewSectionProps {
  onNavigate: (route: string) => void;
  onSelectImage: (img: ImageItem) => void;
}

export const GalleryPreviewSection: React.FC<GalleryPreviewSectionProps> = ({
  onNavigate,
  onSelectImage,
}) => {
  const { language, t } = useLanguage();
  const { images } = useData();

  const previewImages = images.filter(i => i.status === 'published').slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#EAE2D8]">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C85A32] block">
              {t('படத்தொகுப்பு & நிகழ்வுகள்', 'Photographic Archive')}
            </span>
            <h2 className="font-tamil-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#132B20] mt-1 break-words">
              {t('கல்விப் பணிகள் மற்றும் வரலாற்றுத் தருணங்கள்', 'Milestones, Symposia & Field Work')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/images')}
            className="shrink-0 text-xs font-semibold text-[#132B20] hover:text-[#C85A32] inline-flex items-center gap-1.5 transition-colors self-start sm:self-end pb-1"
          >
            <span>{t('அனைத்துப் படங்களையும் காண்க', 'View Full Photographic Archive')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {previewImages.map(img => (
            <div
              key={img.id}
              onClick={() => onSelectImage(img)}
              className="bg-white border border-[#E5DCD0] rounded-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between min-w-0"
            >
              <div className="relative overflow-hidden aspect-[16/10] bg-[#132B20]/5">
                <img
                  src={img.image_url}
                  alt={language === 'ta' ? img.alt_text_ta || img.title_ta : img.alt_text_en || img.title_en}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-graphic') as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div className="fallback-graphic w-full h-full" style={{ display: 'none' }}>
                  <LecturePhotoGraphic
                    title={language === 'ta' ? img.title_ta : img.title_en}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3 py-1.5 bg-white/90 text-[#132B20] rounded-sm text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{t('பெரிதாக்குக', 'Enlarge View')}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-[11px] text-[#786E63] mb-1">
                  <span className="font-semibold text-[#C85A32] uppercase tracking-wider">
                    {language === 'ta' ? img.category : img.category_en}
                  </span>
                  <span>·</span>
                  <span>{img.created_at}</span>
                </div>
                <h4 className="font-tamil-sans font-semibold text-sm text-[#19231D] group-hover:text-[#C85A32] transition-colors leading-snug line-clamp-2">
                  {language === 'ta' ? img.title_ta : img.title_en}
                </h4>
                <p className="text-xs text-[#5C5044] line-clamp-1 mt-1 font-serif italic">
                  {language === 'ta' ? img.caption_ta : img.caption_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
