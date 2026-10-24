import React from 'react';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { BookCoverGraphic } from '../common/VisualAsset';

interface AnnouncementBannerProps {
  onNavigate: (route: string) => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-[#0A1610] text-white relative overflow-hidden border-y border-[#1B3828]">
      {/* Decorative radial gradients */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C85A32]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#183E2C]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#12241B] border border-[#234734] rounded-sm p-8 md:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C85A32]/20 border border-[#C85A32]/40 rounded-sm text-[#E5A086] text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('முக்கிய அறிவிப்பு · புதிய வெளியீடு 2026', 'Featured Milestone · New 2026 Edition')}</span>
              </div>

              <h2 className="font-tamil-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {t(
                  'நவீன மருத்துவக் கலைச்சொல் களஞ்சியம் — இரண்டாம் பதிப்பு',
                  'Comprehensive Modern Tamil Medical Glossary — 2nd Edition'
                )}
              </h2>

              <p className="text-sm md:text-base text-[#B3C7BB] leading-relaxed max-w-2xl mb-8">
                {t(
                  '15,000-க்கும் மேற்பட்ட மருத்துவக் கலைச்சொற்கள், சர்வதேச மருத்துவ நெறிமுறைகளுக்கு ஏற்ப திருத்தப்பட்ட விரிவுபடுத்தப்பட்ட பதிப்பு. மருத்துவக் கல்லூரி நூலகங்கள், பேராசிரியர்கள் மற்றும் ஆய்வாளர்களுக்கு இன்றியமையாத வழிகாட்டி.',
                  'Over 15,000 clinical terms systematically indexed with international nomenclatures, morphological etymology, and clinical vignettes. An indispensable reference for medical universities and practitioners.'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('/publications')}
                  className="px-6 py-3 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs md:text-sm font-semibold rounded-sm transition-colors flex items-center gap-2 shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t('நூல் விவரம் காண்க', 'Examine Publication')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs md:text-sm font-semibold rounded-sm transition-colors"
                >
                  <span>{t('நூல் பெற தொடர்பு கொள்க', 'Bulk / Institutional Inquiries')}</span>
                </button>
              </div>
            </div>

            {/* Right Visual Book Render */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 sm:w-56 transform lg:rotate-3 hover:rotate-0 transition-transform duration-300 shadow-2xl">
                <BookCoverGraphic
                  title_ta="மருத்துவக் கலைச்சொல் களஞ்சியம்"
                  title_en="Tamil Medical Glossary"
                  author="முனைவர் க. சுப்பிரமணியன்"
                  colorTheme="burgundy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
