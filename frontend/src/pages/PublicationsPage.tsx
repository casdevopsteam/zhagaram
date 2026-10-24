import React, { useState, useMemo } from 'react';
import { Search, BookOpen, ExternalLink, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PublicationItem } from '../types';
import { BookCoverGraphic } from '../components/common/VisualAsset';

interface PublicationsPageProps {
  onSelectPublication: (pub: PublicationItem) => void;
}

export const PublicationsPage: React.FC<PublicationsPageProps> = ({ onSelectPublication }) => {
  const { language, t } = useLanguage();
  const { publications } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const published = useMemo(() => {
    return publications.filter(p => p.status === 'published');
  }, [publications]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    published.forEach(p => {
      set.add(language === 'ta' ? p.category : p.category_en);
    });
    return Array.from(set);
  }, [published, language]);

  const filteredPublications = useMemo(() => {
    return published.filter(p => {
      const title = (language === 'ta' ? p.title_ta : p.title_en).toLowerCase();
      const desc = (language === 'ta' ? p.description_ta : p.description_en).toLowerCase();
      const author = (language === 'ta' ? p.author_ta : p.author_en).toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !q || title.includes(q) || desc.includes(q) || author.includes(q);
      const matchesCategory =
        selectedCategory === 'all' ||
        (language === 'ta' ? p.category : p.category_en) === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [published, searchQuery, selectedCategory, language]);

  return (
    <div className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Synopsis */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#C85A32]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
              {t('நூல் மற்றும் ஆய்வு வெளியீடுகள்', 'Publications & Textbooks')}
            </span>
          </div>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#132B20] leading-tight">
            {t('நூல்கள் மற்றும் வெளியீடுகள்', 'Books, Glossaries & Academic Publications')}
          </h1>

          <p className="text-sm md:text-base text-[#5C5044] font-tamil-sans mt-3 max-w-2xl leading-relaxed">
            {t(
              'மருத்துவ மாணவர்களுக்கான இளநிலை பாடநூல்கள், விரிவான நவீன மருத்துவக் கலைச்சொல் களஞ்சியங்கள் மற்றும் தமிழ் அறிவியல் வெளியீடுகள்.',
              'Peer-reviewed undergraduate medical textbooks, authoritative English-Tamil clinical glossaries, and community medicine monographs published by Zhagaram Trust.'
            )}
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white border border-[#E5DCD0] rounded-sm p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C8074] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('நூலின் பெயர், ஆசிரியர் அல்லது கலைச்சொல் மூலம் தேடுக...', 'Search by book title, author, or keyword...')}
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
              {t('அனைத்து நூல்கள்', 'All Books')}
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

        {/* Publications Grid */}
        {filteredPublications.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#E5DCD0] rounded-sm p-8">
            <BookOpen className="w-10 h-10 text-[#C5B7A6] mx-auto mb-3" />
            <h3 className="font-tamil-serif font-bold text-lg text-[#19231D] mb-1">
              {t('நூல்கள் எதுவும் கிடைக்கவில்லை', 'No publications found')}
            </h3>
            <p className="text-xs text-[#786E63] font-serif italic">
              {t('தேடல் சொல்லை மாற்றியமைத்து மீண்டும் முயற்சிக்கவும்.', 'Try revising your keywords or clearing the category filter.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPublications.map((pub, idx) => (
              <div
                key={pub.id}
                onClick={() => onSelectPublication(pub)}
                className="bg-white border border-[#E5DCD0] rounded-sm p-6 flex flex-col justify-between hover:shadow-md hover:border-[#C85A32]/40 transition-all duration-200 cursor-pointer group"
              >
                <div>
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
                            colorTheme={idx % 3 === 0 ? 'green' : idx % 3 === 1 ? 'burgundy' : 'navy'}
                          />
                        </div>
                      </div>
                    ) : (
                      <BookCoverGraphic
                        title_ta={pub.title_ta}
                        title_en={pub.title_en}
                        author={language === 'ta' ? pub.author_ta : pub.author_en}
                        colorTheme={idx % 3 === 0 ? 'green' : idx % 3 === 1 ? 'burgundy' : 'navy'}
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#786E63] mb-1.5">
                    <span className="font-semibold text-[#C85A32] uppercase tracking-wider">
                      {language === 'ta' ? pub.category : pub.category_en}
                    </span>
                    <span>·</span>
                    <span>{pub.publication_year}</span>
                    {pub.isbn && (
                      <>
                        <span>·</span>
                        <span className="font-mono text-[10px]">{pub.isbn}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-tamil-serif font-bold text-lg text-[#19231D] mb-1 group-hover:text-[#C85A32] transition-colors leading-snug">
                    {language === 'ta' ? pub.title_ta : pub.title_en}
                  </h3>

                  <p className="font-serif italic text-xs text-[#786E63] mb-3 line-clamp-1">
                    {language === 'ta' ? pub.title_en : pub.title_ta}
                  </p>

                  <p className="text-xs text-[#5C5044] line-clamp-2 leading-relaxed mb-4">
                    {language === 'ta' ? pub.description_ta : pub.description_en}
                  </p>

                  <div className="text-[11px] text-[#786E63]">
                    <span className="text-[#8C8074]">{t('நூலாசிரியர்:', 'Author:')} </span>
                    <span className="font-medium text-[#19231D]">
                      {language === 'ta' ? pub.author_ta : pub.author_en}
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-[#F2ECE3] flex items-center justify-between text-xs font-semibold text-[#132B20] group-hover:text-[#C85A32]">
                  <div className="text-xs font-normal">
                    {pub.is_free_download ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        <span>{t('இலவச மின்பதிப்பு', 'Free Access')}</span>
                      </span>
                    ) : (
                      <span className="font-semibold font-serif text-[#132B20]">₹{pub.price_inr}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{t('முழு விவரம் காண்க', 'View Details')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
