import React from 'react';
import { Youtube, ExternalLink, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MedicalEducationSectionProps {
  onNavigate: (route: string) => void;
}

export const MedicalEducationSection: React.FC<MedicalEducationSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  const playlistUrl = 'https://youtube.com/playlist?list=PLqAGZgQ8AD2sxSFrSfhbHKMOjjxZ6CrHG';
  const realBookPhoto = '/assets/aistudio/WhatsApp_Image_2026-10-20_at_1.07.57_PM_9e5db21a.jpeg';

  return (
    <section className="py-20 md:py-28 bg-[#0F2219] text-white relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-40 w-96 h-96 bg-[#1F4533] rounded-full blur-3xl pointer-events-none opacity-40" />
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-80 h-80 bg-[#C85A32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Curatorial Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#E5A086]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#E5A086]">
              {t('சிறப்புத் திட்டம் · மருத்துவக் கல்வி (MET)', 'Featured Milestone · Medical Education in Tamil')}
            </span>
          </div>

          <h2 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            MBBS in Tamil — {t('தமிழால் முடியும் (27 காணொளிகள்)', 'Yes, We Can in Tamil (27 Videos)')}
          </h2>

          <p className="text-sm md:text-base text-[#B3C7BB] mt-4 leading-relaxed font-tamil-sans">
            {t(
              '10 மருத்துவ மாணவ-மாணவிகள் மற்றும் அவர்களின் பேராசிரியர்களால் முதன்முறையாக உருவாக்கப்பட்ட வரலாற்றுச் சிறப்புமிக்க தமிழ் வழி மருத்துவக் கல்வித் திட்டம். மனித உடற்கூறியல், உடலியங்கியல் பாடங்களின் 27 விரிவுரைக் காணொளிகள் மற்றும் அரிய பாடநூல்.',
              'A landmark medical initiative pioneered by 10 undergraduate medical students and faculty professors. 27 complete curriculum lecture videos and authoritative textbooks authored under the inspiring creed "ஏனெனில், தமிழ் பெரிது" (Because, Tamil is Vast).'
            )}
          </p>
        </div>

        {/* 2-Column Split: Video Feature & Real Book Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Video Player Spotlight Card with Official Screenshot Header */}
          <div className="lg:col-span-7 min-w-0 bg-[#152F23] border border-[#2B5440] rounded-sm p-6 md:p-8 shadow-xl">
            

            <div className="relative aspect-[16/9] bg-black rounded-sm overflow-hidden mb-6 border border-[#2B5440]">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLqAGZgQ8AD2sxSFrSfhbHKMOjjxZ6CrHG"
                title="MBBS in Tamil 27 Videos Playlist"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-xs uppercase tracking-wider text-[#E5A086] font-semibold">
                  {t('அதிகாரப்பூர்வ YouTube பிளேலிஸ்ட்', 'Official YouTube Playlist')}
                </span>
                <h4 className="font-tamil-serif font-bold text-lg text-white mt-0.5 break-words">
                  MBBS in Tamil — 27 விரிவுரைகள் (MET)
                </h4>
                <p className="text-xs text-[#A6BFAF] mt-0.5 break-words">
                  {t('10 மருத்துவ மாணவர்கள் மற்றும் பேராசிரியர் குழு', 'Team of 10 Medical Students & Teachers')}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-2 shadow-xs shrink-0"
                >
                  <Youtube className="w-4 h-4 shrink-0" />
                  <span>{t('27 காணொளிகளைக் காண்க', 'Watch 27 Videos')}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Accompanying Textbook and Highlights */}
          <div className="lg:col-span-5 min-w-0 flex flex-col justify-between space-y-6">
            
            <div className="bg-[#152F23]/80 border border-[#2B5440] p-6 rounded-sm">
              <div className="flex flex-col sm:flex-row items-start gap-4 min-w-0">
                <div className="w-24 sm:w-28 shrink-0 shadow-lg rounded-sm overflow-hidden border border-[#3A6B53]">
                  <img
                    src={realBookPhoto}
                    alt="MBBS in Tamil Real Textbook Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-widest text-[#E5A086] font-semibold">
                    {t('அச்சிடப்பட்ட பாடநூல்', 'Printed Hardcover Edition')}
                  </span>
                  <h4 className="font-tamil-serif font-bold text-base text-white mt-1 break-words">
                    MBBS in Tamil — {t('தொகுதி 01 (அத்தியாயங்கள் 1-33)', 'Volume 01 (Chapters 1-33)')}
                  </h4>
                  <p className="text-xs text-[#B3C7BB] mt-1.5 leading-relaxed break-words">
                    {t(
                      'குழந்தை அறுவை சிகிச்சை மற்றும் உடற்கூறியல் கலைச்சொற்கள் அடங்கிய முழுமையான பாடநூல்.',
                      'Comprehensive clinical textbook authored by 10 undergraduate medical students and faculty professors.'
                    )}
                  </p>
                  <button
                    onClick={() => onNavigate('/publications')}
                    className="mt-3 text-xs text-[#E5A086] hover:text-white font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t('நூல் விவரம் காண்க', 'Examine Book Details')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Key pedagogical benefits */}
            <div className="space-y-3 text-xs text-[#C5D9CD]">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#E5A086] shrink-0 mt-0.5" />
                <span>
                  {t(
                    '“ஏனெனில், தமிழ் பெரிது” — தமிழ் மொழியால் அனைத்து நவீன மருத்துவ அறிவியலையும் கற்பிக்க முடியும் என்ற வரலாற்றுச் சாதனை.',
                    '“Because, Tamil is Vast” — Proving that comprehensive medical sciences can be mastered fluently in Tamil.'
                  )}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#E5A086] shrink-0 mt-0.5" />
                <span>
                  {t(
                    '27 முழுமையான காணொளிகள் உலகெங்கும் உள்ள தமிழ் மாணவர்களுக்கு இலவசமாகக் கிடைக்கின்றன.',
                    'All 27 lecture videos are freely available in full high-definition for medical undergraduates.'
                  )}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#E5A086] shrink-0 mt-0.5" />
                <span>
                  {t(
                    'அரசு மற்றும் தனியார் மருத்துவக் கல்லூரி மாணவர்களின் கருத்துக்களை ஒருங்கிணைத்து உருவாக்கப்பட்ட நம்பகமான உள்ளடக்கம்.',
                    'Co-authored through hands-on collaboration between practicing doctors and undergraduate MBBS students.'
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/videos')}
              className="w-full py-3 bg-white hover:bg-stone-100 text-[#132B20] text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t('அனைத்து மருத்துவக் காணொளிகளையும் காண்க', 'Explore Complete Video Library')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
