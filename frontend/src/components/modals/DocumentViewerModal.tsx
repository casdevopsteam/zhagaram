import React, { useState } from 'react';
import { X, Download, FileText, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { DocumentItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface DocumentViewerModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document: doc, onClose }) => {
  const { language, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!doc) return null;

  const totalPages = doc.page_count || 12;

  const handleDownload = () => {
    if (doc.file_url && doc.file_url.startsWith('/')) {
      const a = document.createElement('a');
      a.href = doc.file_url;
      a.download = doc.file_name || 'zhagaram_document.pdf';
      a.target = '_blank';
      a.click();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } else {
      const title = language === 'ta' ? doc.title_ta : doc.title_en;
      const author = language === 'ta' ? doc.author_or_source_ta : doc.author_or_source_en;
      const content = `ZHAGARAM TRUST - TAMIL MEDICAL EDUCATION\n=========================================\nTitle: ${title}\nAuthor/Source: ${author}\nYear: ${doc.publication_year}\nFormat: ${doc.format}\nPages: ${doc.page_count}\nVerified by Zhagaram Academic Board.`;
      const blob = new Blob([content], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.file_name || 'zhagaram_document.pdf';
      a.click();
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 md:p-6 animate-in fade-in duration-150">
      <div
        className="max-w-4xl w-full bg-[#FAF8F5] border border-[#E0D7CC] rounded-sm shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Toolbar */}
        <div className="px-5 py-4 bg-[#132B20] text-white flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="p-2 bg-white/10 rounded-sm">
              <FileText className="w-5 h-5 text-[#E5A086]" />
            </div>
            <div className="truncate">
              <span className="text-[10px] uppercase tracking-wider text-[#A6B8AC]">
                {doc.format} · {doc.file_size} · {doc.publication_year}
              </span>
              <h3 className="font-tamil-sans font-bold text-base md:text-lg text-white truncate">
                {language === 'ta' ? doc.title_ta : doc.title_en}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {doc.file_url && (
              <a
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-sm transition-colors"
              >
                <span>{t('முழு PDF திறக்க', 'Open Full PDF')}</span>
              </a>
            )}

            {doc.is_downloadable && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs font-semibold rounded-sm transition-colors"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t('பதிவிறக்கப்பட்டது', 'Downloaded')}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('பதிவிறக்கம் PDF', 'Download PDF')}</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white rounded-sm transition-colors"
              aria-label="Close document viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Viewer Body Simulator */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#EFE9DF] flex justify-center">
          <div className="w-full max-w-2xl bg-white shadow-md border border-[#D5C9BD] p-8 md:p-12 min-h-[500px] flex flex-col justify-between font-tamil-sans text-[#19231D]">
            
            {/* Header within Document Page */}
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-6 border-[#E5DCD0]">
                <div className="text-xs uppercase tracking-widest text-[#786E63] font-serif">
                  ZHAGARAM TRUST · MEDICAL ARCHIVE
                </div>
                <div className="text-xs text-[#8C8074]">
                  {t('பக்கம்', 'Page')} {currentPage} / {totalPages}
                </div>
              </div>

              <h2 className="font-tamil-serif text-xl md:text-2xl font-bold text-[#132B20] mb-3">
                {language === 'ta' ? doc.title_ta : doc.title_en}
              </h2>
              
              <p className="text-xs text-[#C85A32] font-semibold mb-6">
                {t('மூலம் / ஆசிரியர்:', 'Source / Faculty:')}{' '}
                {language === 'ta' ? doc.author_or_source_ta : doc.author_or_source_en}
              </p>

              {/* Sample Document Page Text Content */}
              <div className="space-y-4 text-xs md:text-sm text-[#383028] leading-relaxed">
                <p className="font-serif italic text-stone-600 border-l-2 border-[#C85A32] pl-3 py-1">
                  {language === 'ta' ? doc.description_ta : doc.description_en}
                </p>

                <h4 className="font-bold text-sm text-[#132B20] pt-2">
                  {t('அத்தியாயம் 1: தமிழ் வழி மருத்துவக் கலைச்சொல் கோட்பாடு', 'Section 1: Pedagogical Foundations & Terminology')}
                </h4>
                <p>
                  {t(
                    'மருத்துவக் கல்வியில் தாய்மொழியின் பங்கு மாணவர்களின் புரிதல் வேகத்தை இரட்டிப்பாக்குகிறது. ஆங்கில சொற்களை முழுமையாக தவிர்ப்பது நோக்கமல்ல; மாறாக, அடிப்படை உடற்கூறு மற்றும் உடலியங்கியல் செயல்பாடுகளை தாய்மொழியில் தெளிவாக உணர்ந்து கொள்வதே ஆகும்.',
                    'The role of mother-tongue instruction in medical education accelerates conceptual clarity. Our methodology pairs standardized Tamil clinical terms with universal English nomenclature so medical students retain deep comprehension alongside international clinical competence.'
                  )}
                </p>

                <div className="bg-[#FAF8F5] p-3 rounded-sm border border-[#E8DFD5] my-4 text-xs">
                  <span className="font-bold text-[#132B20] block mb-1">
                    {t('மாதிரி கலைச்சொற்கள் அட்டவணை (Sample Lexicon):', 'Sample Medical Lexicon:')}
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>• Anatomy → உடற்கூறியல்</div>
                    <div>• Physiology → உடலியங்கியல்</div>
                    <div>• Pathology → நோய்க்குறியியல்</div>
                    <div>• Pharmacology → மருந்தியல்</div>
                  </div>
                </div>

                <p className="text-stone-600 text-xs">
                  {t(
                    'இந்த ஆவணம் ழகரம் அறக்கட்டளையின் கல்வி மேற்பார்வைக் குழுவால் சரிபார்க்கப்பட்டு வெளியிடப்பட்டுள்ளது. மாணவர்கள் மற்றும் ஆசிரியர்கள் இதனை ஆய்வுக் குறிப்புகளுக்குப் பயன்படுத்தலாம்.',
                    'This curriculum paper has been authenticated by the Zhagaram Academic Board for dissemination across medical colleges and universities.'
                  )}
                </p>
              </div>
            </div>

            {/* Document Page Footer */}
            <div className="pt-6 mt-8 border-t border-[#E5DCD0] flex justify-between items-center text-[10px] text-[#8C8074]">
              <span>ழகரம் அறக்கட்டளை · கல்வி ஆவணக் காப்பகம்</span>
              <span>Doc Ref: {doc.slug}</span>
            </div>
          </div>
        </div>

        {/* Bottom Page Navigation Controls */}
        <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#5C5044]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-[#D5C9BD] rounded-sm disabled:opacity-40 hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              {t('பக்கம்', 'Page')} {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-[#D5C9BD] rounded-sm disabled:opacity-40 hover:bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-[#786E63]">
            {t('அங்கீகரிக்கப்பட்ட PDF ஆவணம்', 'Verified Educational PDF')}
          </div>
        </div>
      </div>
    </div>
  );
};
