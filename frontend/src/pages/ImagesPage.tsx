import React, { useState, useMemo } from 'react';
import { Search, ZoomIn, Download, Filter, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ImageItem } from '../types';
import { LecturePhotoGraphic } from '../components/common/VisualAsset';

interface ImagesPageProps {
  onSelectImage: (img: ImageItem) => void;
}

export const ImagesPage: React.FC<ImagesPageProps> = ({ onSelectImage }) => {
  const { language, t } = useLanguage();
  const { images } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const publishedImages = useMemo(() => {
    return images.filter(i => i.status === 'published');
  }, [images]);

  // Extract distinct categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    publishedImages.forEach(img => {
      set.add(language === 'ta' ? img.category : img.category_en);
    });
    return Array.from(set);
  }, [publishedImages, language]);

  // Filtered list
  const filteredImages = useMemo(() => {
    return publishedImages.filter(img => {
      const title = (language === 'ta' ? img.title_ta : img.title_en).toLowerCase();
      const caption = (language === 'ta' ? img.caption_ta : img.caption_en).toLowerCase();
      const cat = (language === 'ta' ? img.category : img.category_en).toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      const matchesSearch = !q || title.includes(q) || caption.includes(q) || cat.includes(q);
      const matchesCategory =
        selectedCategory === 'all' ||
        (language === 'ta' ? img.category : img.category_en) === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [publishedImages, searchQuery, selectedCategory, language]);

  return (
    <div className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Synopsis */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#C85A32]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
              {t('படத்தொகுப்பு காப்பகம்', 'Visual Archival Gallery')}
            </span>
          </div>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#132B20] leading-tight">
            {t('படத்தொகுப்பு & வரலாற்றுத் தருணங்கள்', 'Photographic Archives & Historical Conclaves')}
          </h1>

          <p className="text-sm md:text-base text-[#5C5044] font-tamil-sans mt-3 max-w-2xl leading-relaxed">
            {t(
              'மருத்துவக் கல்வி கருத்தரங்குகள், கிராமப்புற நலவாழ்வுப் பயிலரங்குகள், நூல் வெளியீட்டு விழாக்கள் மற்றும் சுவடி ஆவணப்படுத்தல் புகைப்படங்களின் தொகுப்பு.',
              'A curated visual record of Tamil medical conferences, community healthcare camps, publication launches, and historical manuscript preservation initiatives.'
            )}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-[#E5DCD0] rounded-sm p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C8074] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('தலைப்பு அல்லது விளக்கம் மூலம் தேடுக...', 'Search by title or caption...')}
              className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-[#DDD3C7] rounded-sm text-xs md:text-sm text-[#19231D] focus:outline-hidden focus:border-[#C85A32]"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#132B20] text-white'
                  : 'bg-[#F2ECE3] text-[#5C5044] hover:bg-[#EAE2D8]'
              }`}
            >
              {t('அனைத்தும்', 'All Photos')}
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#132B20] text-white'
                    : 'bg-[#F2ECE3] text-[#5C5044] hover:bg-[#EAE2D8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#E5DCD0] rounded-sm p-8">
            <ImageIcon className="w-10 h-10 text-[#C5B7A6] mx-auto mb-3" />
            <h3 className="font-tamil-serif font-bold text-lg text-[#19231D] mb-1">
              {t('புகைப்படங்கள் எதுவும் கிடைக்கவில்லை', 'No images found')}
            </h3>
            <p className="text-xs text-[#786E63] font-serif italic">
              {t('வேறு தேடல் சொற்களை அல்லது பிரிவுகளை முயற்சிக்கவும்.', 'Try adjusting your search query or selecting a different category.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map(img => (
              <div
                key={img.id}
                onClick={() => onSelectImage(img)}
                className="bg-white border border-[#E5DCD0] rounded-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative overflow-hidden aspect-[16/9] bg-[#132B20]/5">
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
                      <span>{t('பெரிதாக்குக', 'Enlarge Image')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#786E63] mb-1">
                      <span className="font-semibold text-[#C85A32] uppercase tracking-wider">
                        {language === 'ta' ? img.category : img.category_en}
                      </span>
                      <span>·</span>
                      <span>{img.created_at}</span>
                    </div>

                    <h3 className="font-tamil-sans font-bold text-base text-[#19231D] group-hover:text-[#C85A32] transition-colors leading-snug mb-1">
                      {language === 'ta' ? img.title_ta : img.title_en}
                    </h3>

                    <p className="text-xs text-[#5C5044] line-clamp-2 leading-relaxed font-serif italic">
                      {language === 'ta' ? img.caption_ta : img.caption_en}
                    </p>
                  </div>

                  {img.credit && (
                    <div className="pt-3 mt-3 border-t border-[#F2ECE3] text-[10px] text-[#8C8074]">
                      {t('பட உரிமை:', 'Credit:')} {img.credit}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
