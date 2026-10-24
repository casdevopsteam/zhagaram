import React from 'react';
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { PublicationItem } from '../../types';
import { BookCoverGraphic } from '../common/VisualAsset';

interface LatestPublicationsSectionProps {
  onNavigate: (route: string) => void;
  onSelectPublication: (pub: PublicationItem) => void;
}

export const LatestPublicationsSection: React.FC<LatestPublicationsSectionProps> = ({
  onNavigate,
  onSelectPublication,
}) => {
  const { language, t } = useLanguage();
  const { publications } = useData();

  const published = publications.filter(p => p.status === 'published').slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#EAE2D8]">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C85A32] block">
              {t('வெளியீடுகள் & நூல்கள்', 'Scholarly Publications')}
            </span>
            <h2 className="font-tamil-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#132B20] mt-1 break-words">
              {t('அண்மைய மருத்துவ மற்றும் அறிவியல் நூல்கள்', 'Featured Medical & Science Textbooks')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/publications')}
            className="shrink-0 text-xs font-semibold text-[#132B20] hover:text-[#C85A32] inline-flex items-center gap-1.5 transition-colors self-start sm:self-end pb-1"
          >
            <span>{t('அனைத்து நூல்களையும் பார்க்க', 'View Complete Publications Catalog')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {published.map((pub, idx) => (
            <div
              key={pub.id}
              onClick={() => onSelectPublication(pub)}
              className="bg-white border border-[#E5DCD0] rounded-sm p-6 flex flex-col justify-between hover:shadow-md hover:border-[#C85A32]/40 transition-all duration-200 cursor-pointer group min-w-0 overflow-hidden"
            >
              <div>
                {/* Book Cover */}
                <div className="w-full max-w-[220px] mx-auto mb-6 shadow-sm group-hover:scale-102 transition-transform duration-200">
                  {pub.cover_image ? (
                    <div className="aspect-[3/4] rounded-sm overflow-hidden border border-[#D5C9BD] shadow-md bg-[#FAF8F5]">
                      <img
                        src={pub.cover_image}
                        alt={language === 'ta' ? pub.title_ta : pub.title_en}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                          const fb = e.currentTarget.parentElement?.querySelector('.book-fallback') as HTMLElement;
                          if (fb) fb.style.display = 'block';
                        }}
                      />
                      <div className="book-fallback w-full h-full" style={{ display: 'none' }}>
                        <BookCoverGraphic
                          title_ta={pub.title_ta}
                          title_en={pub.title_en}
                          author={language === 'ta' ? pub.author_ta : pub.author_en}
                          colorTheme={idx === 0 ? 'green' : idx === 1 ? 'burgundy' : 'navy'}
                        />
                      </div>
                    </div>
                  ) : (
                    <BookCoverGraphic
                      title_ta={pub.title_ta}
                      title_en={pub.title_en}
                      author={language === 'ta' ? pub.author_ta : pub.author_en}
                      colorTheme={idx === 0 ? 'green' : idx === 1 ? 'burgundy' : 'navy'}
                    />
                  )}
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-2 text-xs text-[#786E63] mb-1.5">
                  <span className="font-semibold text-[#C85A32] uppercase tracking-wider">
                    {language === 'ta' ? pub.category : pub.category_en}
                  </span>
                  <span>·</span>
                  <span>{pub.publication_year}</span>
                </div>

                <h3 className="font-tamil-serif font-bold text-lg text-[#19231D] mb-1 group-hover:text-[#C85A32] transition-colors leading-snug">
                  {language === 'ta' ? pub.title_ta : pub.title_en}
                </h3>

                <p className="font-serif italic text-xs text-[#786E63] mb-3 line-clamp-1">
                  {language === 'ta' ? pub.title_en : pub.title_ta}
                </p>

                <p className="text-xs text-[#5C5044] line-clamp-2 leading-relaxed">
                  {language === 'ta' ? pub.description_ta : pub.description_en}
                </p>
              </div>

              {/* Action */}
              <div className="pt-4 mt-6 border-t border-[#F2ECE3] flex items-center justify-between text-xs font-semibold text-[#132B20] group-hover:text-[#C85A32]">
                <div className="text-[11px] text-[#786E63] font-normal">
                  {pub.is_free_download ? (
                    <span className="text-emerald-700 font-semibold">{t('இலவச PDF', 'Free PDF')}</span>
                  ) : (
                    <span>₹{pub.price_inr}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span>{t('விவரம் காண்க', 'View Details')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
