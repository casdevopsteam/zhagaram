import React, { useState, useMemo } from 'react';
import { Search, FileText, Download, Eye, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { DocumentItem } from '../types';
import { DocumentCoverGraphic } from '../components/common/VisualAsset';

interface DocumentsPageProps {
  onSelectDocument: (doc: DocumentItem) => void;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({ onSelectDocument }) => {
  const { language, t } = useLanguage();
  const { documents } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const publishedDocs = useMemo(() => {
    return documents.filter(d => d.status === 'published');
  }, [documents]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    publishedDocs.forEach(d => {
      set.add(language === 'ta' ? d.category : d.category_en);
    });
    return Array.from(set);
  }, [publishedDocs, language]);

  const filteredDocs = useMemo(() => {
    return publishedDocs.filter(d => {
      const title = (language === 'ta' ? d.title_ta : d.title_en).toLowerCase();
      const desc = (language === 'ta' ? d.description_ta : d.description_en).toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      const matchesSearch = !q || title.includes(q) || desc.includes(q);
      const matchesCategory =
        selectedCategory === 'all' ||
        (language === 'ta' ? d.category : d.category_en) === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [publishedDocs, searchQuery, selectedCategory, language]);

  return (
    <div className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Synopsis */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#C85A32]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
              {t('டிஜிட்டல் ஆவணக் காப்பகம்', 'Digital Document Repository')}
            </span>
          </div>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#132B20] leading-tight">
            {t('PDF & பாடத்திட்ட ஆவணங்கள்', 'PDFs, Syllabi & Research Documents')}
          </h1>

          <p className="text-sm md:text-base text-[#5C5044] font-tamil-sans mt-3 max-w-2xl leading-relaxed">
            {t(
              'மருத்துவக் கலைச்சொல் கையேடுகள், பாடத்திட்ட மாதிரி வரைவுகள், சுகாதார வழிகாட்டிகள் மற்றும் அறக்கட்டளையின் அதிகாரப்பூர்வ ஆய்வுக் கட்டுரைகள்.',
              'Searchable clinical terminology handbooks, model curricula, public wellness field guides, and peer-reviewed educational manuscripts in verified PDF format.'
            )}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-[#E5DCD0] rounded-sm p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C8074] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('ஆவணங்களின் தலைப்பு அல்லது முக்கியச் சொல் மூலம் தேடுக...', 'Search documents by title or keywords...')}
              className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-[#DDD3C7] rounded-sm text-xs md:text-sm text-[#19231D] focus:outline-hidden focus:border-[#C85A32]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#132B20] text-white'
                  : 'bg-[#F2ECE3] text-[#5C5044] hover:bg-[#EAE2D8]'
              }`}
            >
              {t('அனைத்து ஆவணங்கள்', 'All Documents')}
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

        {/* Documents Grid */}
        {filteredDocs.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#E5DCD0] rounded-sm p-8">
            <FileText className="w-10 h-10 text-[#C5B7A6] mx-auto mb-3" />
            <h3 className="font-tamil-serif font-bold text-lg text-[#19231D] mb-1">
              {t('ஆவணங்கள் எதுவும் கிடைக்கவில்லை', 'No documents found')}
            </h3>
            <p className="text-xs text-[#786E63] font-serif italic">
              {t('தேடல் சொல்லை மாற்றியமைத்து மீண்டும் முயற்சிக்கவும்.', 'Try revising your keywords or clearing the category filter.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map(doc => (
              <div
                key={doc.id}
                className="bg-white border border-[#E5DCD0] rounded-sm p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  <div className="mb-4">
                    <DocumentCoverGraphic
                      title_ta={doc.title_ta}
                      format={doc.format}
                      pages={doc.page_count}
                      category={language === 'ta' ? doc.category : doc.category_en}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#786E63] mb-1">
                    <span className="font-semibold text-[#C85A32] uppercase tracking-wider">
                      {language === 'ta' ? doc.category : doc.category_en}
                    </span>
                    <span>·</span>
                    <span>{doc.publication_year}</span>
                    <span>·</span>
                    <span>{doc.file_size}</span>
                  </div>

                  <h3 className="font-tamil-sans font-bold text-base text-[#19231D] group-hover:text-[#C85A32] transition-colors leading-snug mb-1">
                    {language === 'ta' ? doc.title_ta : doc.title_en}
                  </h3>

                  <p className="text-xs text-[#5C5044] line-clamp-2 leading-relaxed mb-4">
                    {language === 'ta' ? doc.description_ta : doc.description_en}
                  </p>

                  <div className="text-[11px] text-[#786E63] font-serif italic">
                    {t('மூலம்:', 'Source:')}{' '}
                    {language === 'ta' ? doc.author_or_source_ta : doc.author_or_source_en}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-[#F2ECE3] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectDocument(doc)}
                    className="flex-1 py-2 px-3 bg-[#FAF8F5] hover:bg-[#F2ECE3] border border-[#DDD3C7] text-[#132B20] text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>{t('வாசிக்க / திறக்க', 'Preview Document')}</span>
                  </button>

                  {doc.is_downloadable && (
                    <button
                      onClick={() => onSelectDocument(doc)}
                      className="py-2 px-3 bg-[#132B20] hover:bg-[#1E3E2F] text-white text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5"
                      title={t('பதிவிறக்கம்', 'Download PDF')}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{t('பதிவிறக்க', 'Download')}</span>
                    </button>
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
