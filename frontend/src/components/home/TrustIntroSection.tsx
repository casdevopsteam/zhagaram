import React from 'react';
import { ArrowRight, Compass, BookMarked, Users, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface TrustIntroSectionProps {
  onNavigate: (route: string) => void;
}

export const TrustIntroSection: React.FC<TrustIntroSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-6 min-w-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C85A32]">
              {t('எங்களைப் பற்றி', 'About Zhagaram Trust')}
            </span>
            <h2 className="font-tamil-serif text-3xl sm:text-4xl font-bold text-[#132B20] mt-2 mb-6 leading-tight break-words">
              {t(
                'அறிவியல் மற்றும் மருத்துவ அறிவை தாய்மொழியில் வேரூன்றச் செய்யும் அறப்பணி',
                'Rooting Scientific & Medical Knowledge in the Rich Soil of Tamil'
              )}
            </h2>

            <div className="space-y-4 text-xs md:text-sm text-[#4A4036] leading-relaxed">
              <p className="break-words">
                {t(
                  'ழகரம் அறக்கட்டளை என்பது தமிழ் மொழி வழியே மருத்துவம், அறிவியல், தொழில்நுட்பம் மற்றும் உயர்கல்வி அறிவை எளிய முறையில் மாணவர்களுக்கும் மக்களுக்கும் கொண்டு சேர்க்கும் நோக்கோடு தொடங்கப்பட்ட ஒரு கல்விசார் அமைப்பாகும்.',
                  'Zhagaram Trust is an educational organization dedicated to rendering medicine, science, technology, and higher education seamlessly accessible to students and the wider public in Tamil.'
                )}
              </p>
              <p className="break-words">
                {t(
                  'தற்கால அறிவியல் கண்டுபிடிப்புகளையும் மருத்துவ கலைச்சொற்களையும் (Medical Terminology) தமிழின் இயல்பு மாறாமல் செம்மைப்படுத்தி, மருத்துவப் பாடநூல்கள், விரிவுரைக் காணொளிகள் மற்றும் கலைச்சொல் களஞ்சியங்களை இலவசமாகவும் மலிவு விலையிலும் வெளியிடுகிறோம்.',
                  'We standardize modern scientific and clinical terminology into authentic, etymologically sound Tamil without compromising precision, creating curriculum textbooks, video courses, and comprehensive reference glossaries.'
                )}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#132B20] hover:bg-[#1E3E2F] text-white text-xs font-semibold rounded-sm transition-colors"
              >
                <span>{t('முழு வரலாற்றைப் படிக்க', 'Read Full Mission & History')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#FAF8F5] border border-[#DDD3C7] hover:border-[#C85A32] text-[#132B20] hover:text-[#C85A32] text-xs font-semibold rounded-sm transition-all shadow-2xs"
              >
                <Award className="w-4 h-4 text-[#C85A32]" />
                <span>{t('வழிகாட்டும் புரவலர் பெருமக்கள் (Patrons)', 'Our Guiding Patrons')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-6 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="p-6 bg-white border border-[#E5DCD0] rounded-sm shadow-xs min-w-0 overflow-hidden">
              <Compass className="w-6 h-6 text-[#C85A32] mb-3" />
              <h3 className="font-tamil-serif font-bold text-base text-[#19231D] mb-1.5">
                {t('மருத்துவக் கல்வி உரிமை', 'Mother-Tongue Medicine')}
              </h3>
              <p className="text-xs text-[#5C5044] leading-relaxed">
                {t(
                  'மருத்துவ முதலாம் ஆண்டு பாடங்களை தமிழில் கற்பித்து, கிராமப்புற மற்றும் அரசுப் பள்ளி மாணவர்களின் தன்னம்பிக்கையை உயர்த்துதல்.',
                  'Demystifying foundational medical sciences in Tamil to empower rural and vernacular-medium students.'
                )}
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5DCD0] rounded-sm shadow-xs">
              <BookMarked className="w-6 h-6 text-[#1E4D38] mb-3" />
              <h3 className="font-tamil-serif font-bold text-base text-[#19231D] mb-1.5">
                {t('கலைச்சொல்லாக்கம்', 'Standardized Lexicon')}
              </h3>
              <p className="text-xs text-[#5C5044] leading-relaxed">
                {t(
                  'ஆயிரக்கணக்கான நவீன மருத்துவ சொற்களுக்கு முறையான இலக்கண நெறிமுறைகளுடன் கூடிய தமிழ்ச் சொற்களை உருவாக்குதல்.',
                  'Systematic lexicographical coinage of thousands of clinical terms in harmony with classical Tamil syntax.'
                )}
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5DCD0] rounded-sm shadow-xs">
              <Users className="w-6 h-6 text-[#B84A28] mb-3" />
              <h3 className="font-tamil-serif font-bold text-base text-[#19231D] mb-1.5">
                {t('சமூக நல்வாழ்வு முகாம்கள்', 'Grassroots Outreach')}
              </h3>
              <p className="text-xs text-[#5C5044] leading-relaxed">
                {t(
                  'கிராமப்புற மக்களிடம் தாய்மொழியில் சுகாதாரம், ஊட்டச்சத்து மற்றும் தொற்றா நோய் விழிப்புணர்வை ஏற்படுத்துதல்.',
                  'Conducting preventative healthcare, nutrition, and non-communicable disease workshops in rural communities.'
                )}
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5DCD0] rounded-sm shadow-xs">
              <Award className="w-6 h-6 text-[#8C6D46] mb-3" />
              <h3 className="font-tamil-serif font-bold text-base text-[#19231D] mb-1.5">
                {t('மாணவர் வழிகாட்டல்', 'Academic Mentorship')}
              </h3>
              <p className="text-xs text-[#5C5044] leading-relaxed">
                {t(
                  'உயர்கல்வி பயிலும் தமிழ் வழிக் கல்லூரி மாணவர்களுக்கு மருத்துவக் கல்வி உதவித்தொகை மற்றும் வழிகாட்டல்.',
                  'Providing scholarships, mentoring, and academic guidance for aspiring medical students.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
