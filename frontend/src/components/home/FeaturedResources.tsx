import React from 'react';
import { ArrowRight, BookOpen, FileText, Video, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';

interface FeaturedResourcesProps {
  onNavigate: (route: string) => void;
}

export const FeaturedResources: React.FC<FeaturedResourcesProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { publications, documents, videos, images } = useData();

  const resources = [
    {
      type: 'publications',
      route: '/publications',
      title_ta: 'நூல்கள் மற்றும் வெளியீடுகள்',
      title_en: 'Books & Publications',
      desc_ta: 'உடற்கூறியல் பாடநூல்கள், மருத்துவ கலைச்சொல் களஞ்சியங்கள் மற்றும் தமிழ் கல்வி நூல்கள்.',
      desc_en: 'Authoritative MBBS anatomy textbooks, medical glossaries, and higher education works in Tamil.',
      count: publications.filter(p => p.status === 'published').length,
      countLabel_ta: 'நூல்கள்',
      countLabel_en: 'Volumes',
      icon: BookOpen,
      accentColor: 'text-[#C85A32]',
      borderHover: 'hover:border-[#C85A32]',
      bgKicker: 'bg-[#C85A32]/10',
    },
    {
      type: 'documents',
      route: '/documents',
      title_ta: 'PDF மற்றும் பாடத்திட்ட ஆவணங்கள்',
      title_en: 'PDFs & Curricula',
      desc_ta: 'மருத்துவக் கலைச்சொல் கையேடுகள், ஆய்வுக் கட்டுரைகள் மற்றும் மாதிரி வினாத்தாள்கள்.',
      desc_en: 'Searchable clinical terminology handbooks, syllabi, research papers, and guides.',
      count: documents.filter(d => d.status === 'published').length,
      countLabel_ta: 'ஆவணங்கள்',
      countLabel_en: 'Documents',
      icon: FileText,
      accentColor: 'text-[#1E4D38]',
      borderHover: 'hover:border-[#1E4D38]',
      bgKicker: 'bg-[#1E4D38]/10',
    },
    {
      type: 'videos',
      route: '/videos',
      title_ta: 'மருத்துவக் காணொளிகள்',
      title_en: 'Video Lectures',
      desc_ta: 'பேராசிரியர்களின் MBBS in Tamil விரிவுரைகள் மற்றும் கலைச்சொல்லாக்க உரைகள்.',
      desc_en: 'Visual lecture series for undergraduate medical students and terminology discussions.',
      count: videos.filter(v => v.status === 'published').length,
      countLabel_ta: 'விரிவுரைகள்',
      countLabel_en: 'Lectures',
      icon: Video,
      accentColor: 'text-[#B84A28]',
      borderHover: 'hover:border-[#B84A28]',
      bgKicker: 'bg-[#B84A28]/10',
    },
    {
      type: 'images',
      route: '/images',
      title_ta: 'படத்தொகுப்பு மற்றும் ஆவணங்கள்',
      title_en: 'Image Archives',
      desc_ta: 'கருத்தரங்கு நிகழ்வுகள், மருத்துவ வரலாற்று சுவடிகள் மற்றும் சமூகப் பணி புகைப்படங்கள்.',
      desc_en: 'Historical medical manuscripts, symposia archives, and community health camps.',
      count: images.filter(i => i.status === 'published').length,
      countLabel_ta: 'படங்கள்',
      countLabel_en: 'Photographs',
      icon: ImageIcon,
      accentColor: 'text-[#8C6D46]',
      borderHover: 'hover:border-[#8C6D46]',
      bgKicker: 'bg-[#8C6D46]/10',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C85A32]">
              {t('கல்வி வளங்கள்', 'Educational Repositories')}
            </span>
            <h2 className="font-tamil-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#132B20] mt-1">
              {t('அனைவருக்குமான அறிவுக் களஞ்சியம்', 'Curated Knowledge Libraries')}
            </h2>
          </div>
          <p className="font-serif italic text-xs md:text-sm text-[#786E63] mt-2 md:mt-0 max-w-md">
            {t(
              'அனைத்து வளங்களும் வகைப்படுத்தப்பட்டு இலவச மற்றும் ஆராய்ச்சிப் பயன்பாட்டிற்கு வழங்கப்படுகின்றன.',
              'Categorized and peer-reviewed educational media prepared by scholars and doctors.'
            )}
          </p>
        </div>

        {/* 4 Distinct Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.type}
                onClick={() => onNavigate(card.route)}
                className={`bg-white border border-[#E5DCD0] rounded-sm p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${card.borderHover} group min-w-0 overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-sm ${card.bgKicker}`}>
                      <Icon className={`w-5 h-5 ${card.accentColor}`} />
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#8C8074]">
                      {card.count} {language === 'ta' ? card.countLabel_ta : card.countLabel_en}
                    </span>
                  </div>

                  <h3 className="font-tamil-serif font-bold text-lg text-[#19231D] mb-2 group-hover:text-[#C85A32] transition-colors">
                    {language === 'ta' ? card.title_ta : card.title_en}
                  </h3>

                  <p className="text-xs text-[#5C5044] leading-relaxed">
                    {language === 'ta' ? card.desc_ta : card.desc_en}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F2ECE3] flex items-center justify-between text-xs font-semibold text-[#132B20] group-hover:text-[#C85A32] transition-colors">
                  <span>{t('பிரிவை ஆராய்க', 'Explore Library')}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
