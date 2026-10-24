import React from 'react';
import { ArrowRight, BookOpen, Calendar, Video, FileText, ImageIcon, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';

interface HeroSectionProps {
  onNavigate: (route: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { settings } = useData();

  const tamilPictureUrl = '/assets/aistudio/WhatsApp_Image_2026-10-20_at_1.07.37_PM_8790fe47.jpeg';
  const zhagaramLogoUrl = '/assets/aistudio/WhatsApp_Image_2026-10-20_at_1.07.36_PM_1015e3fc.jpeg';
  const mbbsBookPhotoUrl = '/assets/aistudio/WhatsApp_Image_2026-10-20_at_1.07.57_PM_9e5db21a.jpeg';

  return (
    <section className="relative overflow-hidden py-6 sm:py-12 md:py-16 lg:py-20 border-b border-[#E8DFD5] bg-[#FAF8F5] w-full">
      
      {/* Mobile-Only Portrait Background Artwork (Supplied by User) */}
      <div 
        className="block sm:hidden absolute inset-0 bg-cover bg-top bg-no-repeat pointer-events-none opacity-90"
        style={{ backgroundImage: `url('/assets/mobile-hero-bg.jpg')` }}
      />

      {/* Desktop/Web-Only Landscape Background Artwork (Untouched for Web) */}
      <div 
        className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-85 sm:opacity-90"
        style={{ backgroundImage: `url('/assets/landing-bg.jpg')` }}
      />

      {/* Gentle gradient vignette to preserve contrast and artwork fidelity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/60 via-[#FAF8F5]/35 to-[#FAF8F5]/70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Cultural Kicker with Zhagaram Emblem */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6 p-2.5 sm:px-5 sm:py-3 border-b border-[#132B20]/15 bg-white/85 backdrop-blur-md rounded-sm shadow-2xs w-full min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img
              src={zhagaramLogoUrl}
              alt="Zhagaram Emblem ழ"
              className="w-7 h-7 sm:w-9 sm:h-9 object-contain rounded-full shadow-2xs border border-[#E0D7CC] bg-white p-0.5 shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold text-[#C85A32] block truncate">
                {t('ழகரம் அறக்கட்டளை · கல்வி & அறிவியல் தளம்', 'Zhagaram Educational & Medical Foundation')}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#5C5044] font-serif italic truncate block">
                {t(settings.address_ta, settings.address_en)}
              </span>
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-emerald-900/90 text-white rounded-xs text-[10px] sm:text-[11px] font-semibold shadow-2xs inline-block">
              {t('MBBS in Tamil — 27 விரிவுரைகள்', 'MBBS in Tamil — 27 Lectures')}
            </span>
          </div>
        </div>

        {/* Main 2-Column Split: Editorial Prose + Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Editorial Typography & Calls to Action */}
          <div className="lg:col-span-7 min-w-0 flex flex-col justify-between bg-white/92 sm:bg-white/85 backdrop-blur-md p-3.5 sm:p-6 md:p-8 lg:p-10 rounded-sm border border-[#E0D7CC]/90 shadow-md">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
                <span className="w-5 sm:w-6 h-0.5 bg-[#C85A32]" />
                <span className="text-xs uppercase tracking-widest font-bold text-[#C85A32]">
                  {t('தாய்மொழி வழி மருத்துவக் கல்வி', 'Vernacular Medical Pedagogy')}
                </span>
              </div>

              {/* Editorial Headline */}
              <h1 className="font-tamil-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#132B20] leading-[1.25] tracking-tight mb-3 sm:mb-4 break-words">
                {t(
                  'தாய்மொழியில் அறிவோம். அறிவியலில் உயர்வோம்.',
                  'Learn in Your Language. Grow Through Knowledge.'
                )}
              </h1>

              {/* Supporting Prose */}
              <p className="text-xs sm:text-sm md:text-base text-[#3D342C] font-normal leading-relaxed mb-6 font-tamil-sans break-words">
                {t(
                  'மருத்துவம், அறிவியல் மற்றும் உயர்கல்வி அறிவைத் தமிழில் அனைவருக்கும் கொண்டு சேர்ப்போம். இளநிலை MBBS மாணவர்களுக்கான பாடநூல்கள், உடற்கூறியல் கலைச்சொல் களஞ்சியங்கள், திறன் 2026 பயிலரங்குகள் மற்றும் ஆய்வுக் கட்டுரைகளின் அதிகாரப்பூர்வக் கூடம்.',
                  'Making medical, scientific, and educational knowledge universally accessible through the richness of Tamil. Official undergraduate MBBS in Tamil textbooks, clinical glossaries, THIRAN 2026 workshops, and research archives.'
                )}
              </p>

              {/* Quick Section Shortcuts Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 sm:mb-8">
                <button
                  onClick={() => onNavigate('/events')}
                  className="p-2 sm:p-2.5 bg-[#FAF8F5]/90 hover:bg-white border border-[#DDD3C7] hover:border-[#C85A32] rounded-sm text-left transition-all group shadow-2xs min-w-0 overflow-hidden"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#132B20] group-hover:text-[#C85A32] truncate">
                    <Calendar className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                    <span className="truncate">{t('நிகழ்வுகள்', 'Events')}</span>
                  </div>
                  <span className="text-[10px] text-[#786E63] block mt-0.5 truncate font-medium">
                    {t('திறன் 2026', 'THIRAN 2026')}
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('/images')}
                  className="p-2 sm:p-2.5 bg-[#FAF8F5]/90 hover:bg-white border border-[#DDD3C7] hover:border-[#C85A32] rounded-sm text-left transition-all group shadow-2xs min-w-0 overflow-hidden"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#132B20] group-hover:text-[#C85A32] truncate">
                    <ImageIcon className="w-3.5 h-3.5 text-[#8C6D46] shrink-0" />
                    <span className="truncate">{t('படத்தொகுப்பு', 'Gallery')}</span>
                  </div>
                  <span className="text-[10px] text-[#786E63] block mt-0.5 truncate font-medium">
                    {t('புகைப்படங்கள்', 'Photo Archives')}
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('/videos')}
                  className="p-2 sm:p-2.5 bg-[#FAF8F5]/90 hover:bg-white border border-[#DDD3C7] hover:border-[#C85A32] rounded-sm text-left transition-all group shadow-2xs min-w-0 overflow-hidden"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#132B20] group-hover:text-[#C85A32] truncate">
                    <Video className="w-3.5 h-3.5 text-[#B84A28] shrink-0" />
                    <span className="truncate">{t('காணொளிகள்', 'Videos')}</span>
                  </div>
                  <span className="text-[10px] text-[#786E63] block mt-0.5 truncate font-medium">
                    {t('விரிவுரைகள்', 'Video Lectures')}
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('/documents')}
                  className="p-2 sm:p-2.5 bg-[#FAF8F5]/90 hover:bg-white border border-[#DDD3C7] hover:border-[#C85A32] rounded-sm text-left transition-all group shadow-2xs min-w-0 overflow-hidden"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#132B20] group-hover:text-[#C85A32] truncate">
                    <FileText className="w-3.5 h-3.5 text-[#1E4D38] shrink-0" />
                    <span className="truncate">{t('ஆவணங்கள்', 'Documents')}</span>
                  </div>
                  <span className="text-[10px] text-[#786E63] block mt-0.5 truncate font-medium">
                    {t('கணையாழி PDF', 'Kanaiyazhi PDF')}
                  </span>
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => onNavigate('/publications')}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs md:text-sm font-semibold rounded-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>{t('MBBS தமிழ் நூல்கள் காண்க', 'Explore MBBS Textbooks')}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={() => onNavigate('/events')}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-[#FAF8F5] border border-[#D5C9BD] text-[#132B20] text-xs md:text-sm font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Calendar className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>{t('திறன் 2026 பயிலரங்கம்', 'THIRAN 2026 Conclave')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Anchor Card with Clean Integrated Badge */}
          <div className="lg:col-span-5 min-w-0 flex flex-col">
            <div className="bg-white/95 sm:bg-white/90 backdrop-blur-md p-3.5 sm:p-4 rounded-sm border border-[#E5DCD0] shadow-md flex-1 flex flex-col justify-between overflow-hidden">
              
              <div>
                {/* The Supplied Authentic Tamil Calligraphy Art */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-[2px] bg-[#FAF8F5] border border-[#EFE7DE] shadow-2xs">
                  <img
                    src={tamilPictureUrl}
                    alt="தமிழ் - அமுதே தமிழே அழகிய மொழியே எனதுயிரே"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>

                <div className="mt-2.5 px-1">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-[#C85A32] block">
                    {t('ழகரம் முகப்புத் திருவுருவம்', 'Zhagaram Emblem & Language Heritage')}
                  </span>
                  <p className="font-tamil-serif text-xs sm:text-sm text-[#4A4036] mt-0.5 leading-snug">
                    {t('அமுதே தமிழே அழகிய மொழியே எனதுயிரே — அறிவியல் மற்றும் மருத்துவ அறிவின் அடித்தளம்', 'Tamil — The Foundation of Science, Literature and Medicine')}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F2ECE3]">
                {/* Book Thumbnail Preview */}
                <div className="flex items-center justify-between text-xs text-[#5C5044] gap-2 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={mbbsBookPhotoUrl}
                      alt="MBBS in Tamil Textbook"
                      className="w-10 h-10 object-cover rounded-xs border border-[#DDD3C7] shadow-2xs shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="font-tamil-sans font-bold text-xs text-[#132B20] block leading-tight truncate">
                        MBBS in Tamil — தொகுதி 1
                      </span>
                      <span className="text-[10px] text-[#786E63] truncate block">
                        {t('10 மாணவர்கள் & ஆசிரியர் குழு', 'By 10 Students & Teachers')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('/publications')}
                    className="text-xs font-semibold text-[#C85A32] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>{t('நூல் விவரம்', 'Details')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Inline Verified Publication Seal (Replaces the broken absolute negative offset badge) */}
                <div className="flex items-center justify-between text-[11px] bg-[#132B20] text-white px-3 py-2 rounded-xs shadow-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <ShieldCheck className="w-4 h-4 text-[#E5A086] shrink-0" />
                    <span className="font-semibold text-[#E5A086] truncate">
                      {t('அங்கீகரிக்கப்பட்ட பதிப்பு', 'Authentic Edition')}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/90 font-serif italic shrink-0">
                    {t('ஏனெனில், தமிழ் பெரிது', 'Because, Tamil is Vast')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
