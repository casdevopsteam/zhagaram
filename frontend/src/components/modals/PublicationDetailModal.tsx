import React, { useState } from 'react';
import { X, BookOpen, ShoppingBag, Download, CheckCircle2 } from 'lucide-react';
import { PublicationItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { BookCoverGraphic } from '../common/VisualAsset';

interface PublicationDetailModalProps {
  publication: PublicationItem | null;
  onClose: () => void;
  onEnquire?: (pubTitle: string) => void;
}

export const PublicationDetailModal: React.FC<PublicationDetailModalProps> = ({
  publication: pub,
  onClose,
  onEnquire,
}) => {
  const { language, t } = useLanguage();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!pub) return null;

  const handleDownload = () => {
    const title = language === 'ta' ? pub.title_ta : pub.title_en;
    const author = language === 'ta' ? pub.author_ta : pub.author_en;
    const content = `ZHAGARAM TRUST PUBLICATIONS\n===========================\nTitle: ${title}\nAuthor: ${author}\nISBN: ${pub.isbn || 'N/A'}\nYear: ${pub.publication_year}\nPages: ${pub.page_count}\nPublished by: ${language === 'ta' ? pub.publisher_ta : pub.publisher_en}\nVerified Tamil Educational Work.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pub.slug || 'zhagaram_book_sample'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 md:p-6 animate-in fade-in duration-150">
      <div
        className="max-w-4xl w-full bg-[#FAF8F5] border border-[#E0D7CC] rounded-sm shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 bg-[#132B20] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#E5A086]" />
            <span className="text-xs uppercase tracking-wider text-[#A6B8AC]">
              {language === 'ta' ? pub.category : pub.category_en}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-sm transition-colors"
            aria-label="Close book details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Book Cover Column */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[280px]">
                {pub.cover_image ? (
                  <div className="aspect-[3/4] rounded-sm overflow-hidden border border-[#D5C9BD] shadow-lg bg-[#FAF8F5]">
                    <img
                      src={pub.cover_image}
                      alt={language === 'ta' ? pub.title_ta : pub.title_en}
                      className="w-full h-full object-cover"
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
                        colorTheme={pub.id.includes('mbbs') ? 'green' : 'burgundy'}
                      />
                    </div>
                  </div>
                ) : (
                  <BookCoverGraphic
                    title_ta={pub.title_ta}
                    title_en={pub.title_en}
                    author={language === 'ta' ? pub.author_ta : pub.author_en}
                    colorTheme={pub.id.includes('mbbs') ? 'green' : 'burgundy'}
                  />
                )}
              </div>

              {/* Price & Primary CTA */}
              <div className="w-full max-w-[280px] mt-4 p-4 bg-white border border-[#E5DCD0] rounded-sm text-center">
                {pub.is_free_download ? (
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-sm">
                      {t('இலவச மின்பதிப்பு', 'Free Digital Access')}
                    </span>
                    <button
                      onClick={handleDownload}
                      className="mt-3 w-full py-2.5 bg-[#132B20] hover:bg-[#1E3E2F] text-white text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-2"
                    >
                      {downloadSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{t('பதிவிறக்கப்பட்டது', 'Downloaded')}</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>{t('இலவசமாகப் பதிவிறக்க', 'Download Free PDF')}</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs text-[#786E63]">
                      {t('அச்சிடப்பட்ட நூலின் விலை:', 'Hardcover Edition Price:')}
                    </div>
                    <div className="text-2xl font-bold font-serif text-[#132B20] my-1">
                      ₹{pub.price_inr}
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        if (onEnquire) onEnquire(language === 'ta' ? pub.title_ta : pub.title_en);
                      }}
                      className="mt-2 w-full py-2.5 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t('நூல் பெற விண்ணப்பிக்க', 'Order / Enquire Book')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Book Details Column */}
            <div className="md:col-span-7">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32]">
                {language === 'ta' ? pub.category : pub.category_en}
              </span>
              <h2 className="font-tamil-serif text-2xl md:text-3xl font-bold text-[#132B20] mt-1 mb-2 leading-tight">
                {language === 'ta' ? pub.title_ta : pub.title_en}
              </h2>
              <p className="font-serif italic text-sm text-[#786E63] mb-4">
                {language === 'ta' ? pub.title_en : pub.title_ta}
              </p>

              {/* Author & Publisher Details */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#E8DFD5] text-xs text-[#5C5044] mb-6">
                <div>
                  <span className="text-[#8C8074] block">{t('நூலாசிரியர் / குழு:', 'Author / Board:')}</span>
                  <span className="font-medium text-[#19231D]">
                    {language === 'ta' ? pub.author_ta : pub.author_en}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C8074] block">{t('வெளியீட்டகம்:', 'Publisher:')}</span>
                  <span className="font-medium text-[#19231D]">
                    {language === 'ta' ? pub.publisher_ta : pub.publisher_en}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C8074] block">{t('வெளியீட்டு ஆண்டு:', 'Year:')}</span>
                  <span className="font-medium text-[#19231D]">{pub.publication_year}</span>
                </div>
                <div>
                  <span className="text-[#8C8074] block">{t('பக்கங்கள்:', 'Pages:')}</span>
                  <span className="font-medium text-[#19231D]">{pub.page_count} {t('பக்கங்கள்', 'pages')}</span>
                </div>
                {pub.isbn && (
                  <div className="col-span-2">
                    <span className="text-[#8C8074]">{t('ISBN எண்:', 'ISBN:')} </span>
                    <span className="font-mono text-[11px] text-[#19231D]">{pub.isbn}</span>
                  </div>
                )}
              </div>

              {/* Synopsis */}
              <div className="mb-6">
                <h4 className="font-tamil-sans font-bold text-sm text-[#132B20] uppercase tracking-wider mb-2">
                  {t('நூல் அறிமுகம் & விவரம்', 'Overview & Synopsis')}
                </h4>
                <p className="text-xs md:text-sm text-[#4A4036] leading-relaxed">
                  {language === 'ta' ? pub.description_ta : pub.description_en}
                </p>
              </div>

              {/* Table of Contents */}
              {(pub.table_of_contents_ta || pub.table_of_contents_en) && (
                <div>
                  <h4 className="font-tamil-sans font-bold text-sm text-[#132B20] uppercase tracking-wider mb-2">
                    {t('பொருளடக்கம் (முக்கிய அத்தியாயங்கள்)', 'Table of Contents')}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#5C5044] bg-white p-3.5 border border-[#E5DCD0] rounded-sm">
                    {(language === 'ta' ? pub.table_of_contents_ta : pub.table_of_contents_en)?.map(
                      (item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C85A32] rounded-full shrink-0" />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
