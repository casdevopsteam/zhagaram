import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, FileText, Video, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onSelectItem?: (type: string, id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectItem,
}) => {
  const { publications, documents, videos, images } = useData();
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const matches: Array<{
      id: string;
      type: 'publication' | 'document' | 'video' | 'image';
      title: string;
      desc: string;
      category: string;
      route: string;
    }> = [];

    // Publications
    publications.forEach(p => {
      if (p.status !== 'published') return;
      const tTa = p.title_ta.toLowerCase();
      const tEn = p.title_en.toLowerCase();
      const dTa = p.description_ta.toLowerCase();
      const dEn = p.description_en.toLowerCase();
      const c = p.category.toLowerCase();
      if (tTa.includes(q) || tEn.includes(q) || dTa.includes(q) || dEn.includes(q) || c.includes(q)) {
        matches.push({
          id: p.id,
          type: 'publication',
          title: language === 'ta' ? p.title_ta : p.title_en,
          desc: language === 'ta' ? p.description_ta : p.description_en,
          category: language === 'ta' ? p.category : p.category_en,
          route: '/publications',
        });
      }
    });

    // Documents
    documents.forEach(d => {
      if (d.status !== 'published') return;
      const tTa = d.title_ta.toLowerCase();
      const tEn = d.title_en.toLowerCase();
      const dTa = d.description_ta.toLowerCase();
      const dEn = d.description_en.toLowerCase();
      if (tTa.includes(q) || tEn.includes(q) || dTa.includes(q) || dEn.includes(q)) {
        matches.push({
          id: d.id,
          type: 'document',
          title: language === 'ta' ? d.title_ta : d.title_en,
          desc: language === 'ta' ? d.description_ta : d.description_en,
          category: language === 'ta' ? d.category : d.category_en,
          route: '/documents',
        });
      }
    });

    // Videos
    videos.forEach(v => {
      if (v.status !== 'published') return;
      const tTa = v.title_ta.toLowerCase();
      const tEn = v.title_en.toLowerCase();
      const dTa = v.description_ta.toLowerCase();
      const dEn = v.description_en.toLowerCase();
      if (tTa.includes(q) || tEn.includes(q) || dTa.includes(q) || dEn.includes(q)) {
        matches.push({
          id: v.id,
          type: 'video',
          title: language === 'ta' ? v.title_ta : v.title_en,
          desc: language === 'ta' ? v.description_ta : v.description_en,
          category: language === 'ta' ? v.category : v.category_en,
          route: '/videos',
        });
      }
    });

    // Images
    images.forEach(img => {
      if (img.status !== 'published') return;
      const tTa = img.title_ta.toLowerCase();
      const tEn = img.title_en.toLowerCase();
      const cTa = img.caption_ta.toLowerCase();
      if (tTa.includes(q) || tEn.includes(q) || cTa.includes(q)) {
        matches.push({
          id: img.id,
          type: 'image',
          title: language === 'ta' ? img.title_ta : img.title_en,
          desc: language === 'ta' ? img.caption_ta : img.caption_en,
          category: language === 'ta' ? img.category : img.category_en,
          route: '/images',
        });
      }
    });

    return matches;
  }, [query, publications, documents, videos, images, language]);

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'publication':
        return <BookOpen className="w-4 h-4 text-[#C85A32]" />;
      case 'document':
        return <FileText className="w-4 h-4 text-[#2D5A43]" />;
      case 'video':
        return <Video className="w-4 h-4 text-[#B84A28]" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-[#8C7355]" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'publication':
        return t('நூல்', 'Book');
      case 'document':
        return t('ஆவணம்', 'Document');
      case 'video':
        return t('காணொளி', 'Video');
      case 'image':
        return t('படம்', 'Image');
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-[#FAF8F5] border border-[#E0D7CC] rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E8DFD5] bg-white">
          <Search className="w-5 h-5 text-[#8A7C6E] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t(
              'நூல்கள், ஆவணங்கள், காணொளிகள், படங்களைத் தேடுங்கள்...',
              'Search books, documents, lectures, images...'
            )}
            className="w-full bg-transparent text-sm md:text-base text-[#19231D] placeholder-[#9E9285] focus:outline-hidden font-tamil-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8A7C6E] hover:text-[#19231D] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2.5 py-1 text-xs text-[#8A7C6E] hover:text-[#19231D] border border-[#E0D7CC] rounded-sm transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-4 py-2 bg-[#F5EFE8] border-b border-[#E8DFD5] flex items-center gap-2 overflow-x-auto text-xs text-[#6B5F52]">
          <span className="shrink-0 font-medium">{t('விரைவுத் தேடல்:', 'Suggestions:')}</span>
          {['MBBS', 'உடற்கூறியல்', 'Anatomy', 'கலைச்சொல்', 'கருத்தரங்கம்', 'PDF'].map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 bg-white border border-[#DDD3C7] rounded-sm hover:border-[#C85A32] hover:text-[#C85A32] transition-colors whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#EFE7DE] p-2">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-sm text-[#8A7C6E]">
              <p className="font-serif italic">
                {t(
                  'தேடல் சொல்லை உள்ளிடுங்கள் (தமிழ் அல்லது ஆங்கிலம்).',
                  'Type in Tamil or English to discover educational resources.'
                )}
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#8A7C6E]">
              <p className="font-medium text-[#19231D] mb-1">
                {t('எந்த வளமும் கிடைக்கவில்லை.', 'No resources found.')}
              </p>
              <p className="font-serif italic text-xs">
                {t(
                  'வேறு சொற்களைப் பயன்படுத்தி முயற்சிக்கவும்.',
                  'Try different keywords or browse our dedicated library pages.'
                )}
              </p>
            </div>
          ) : (
            results.map(item => (
              <button
                key={`${item.type}-${item.id}`}
                onClick={() => {
                  onClose();
                  onNavigate(item.route);
                  if (onSelectItem) onSelectItem(item.type, item.id);
                }}
                className="w-full text-left p-3 hover:bg-[#F2ECE3] rounded-sm transition-colors flex items-start gap-3 group"
              >
                <div className="mt-1 p-1.5 bg-white border border-[#E0D7CC] rounded-sm shrink-0 group-hover:border-[#C85A32] transition-colors">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-[#786E63] mb-0.5">
                    <span className="font-semibold uppercase tracking-wider text-[#C85A32]">
                      {getTypeLabel(item.type)}
                    </span>
                    <span>·</span>
                    <span>{item.category}</span>
                  </div>
                  <h4 className="font-tamil-sans font-semibold text-sm text-[#19231D] group-hover:text-[#C85A32] transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#6B5F52] line-clamp-1 mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A89C8E] group-hover:text-[#C85A32] shrink-0 self-center transition-colors" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#F2ECE3] border-t border-[#E8DFD5] flex items-center justify-between text-[11px] text-[#7A6E62]">
          <span>
            {results.length > 0
              ? `${results.length} ${t('முடிவுகள் கண்டறியப்பட்டன', 'results found')}`
              : t('அனைத்து வளங்களும் சரிபார்க்கப்பட்டவை', 'All resources verified')}
          </span>
          <span>ழகரம் கல்வித் தளம்</span>
        </div>
      </div>
    </div>
  );
};
