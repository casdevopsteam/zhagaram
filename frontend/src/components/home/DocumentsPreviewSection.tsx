import React from 'react';
import { ArrowRight, FileText, Download, Eye, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { DocumentItem } from '../../types';
import { DocumentCoverGraphic } from '../common/VisualAsset';

interface DocumentsPreviewSectionProps {
  onNavigate: (route: string) => void;
  onSelectDocument: (doc: DocumentItem) => void;
}

export const DocumentsPreviewSection: React.FC<DocumentsPreviewSectionProps> = ({
  onNavigate,
  onSelectDocument,
}) => {
  const { language, t } = useLanguage();
  const { documents } = useData();

  const previewDocs = documents.filter(d => d.status === 'published').slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#EAE2D8]">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C85A32] block">
              {t('டிஜிட்டல் ஆவணக் காப்பகம்', 'Digital Archive & PDFs')}
            </span>
            <h2 className="font-tamil-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#132B20] mt-1 break-words">
              {t('மருத்துவ மற்றும் கல்வி ஆவணங்கள்', 'Authoritative Medical Papers & Journals')}
            </h2>
            <p className="text-xs md:text-sm text-[#5C5044] font-tamil-sans mt-2 max-w-xl break-words">
              {t(
                'கணையாழி சிறப்பு இதழ், மருத்துவ ஆராய்ச்சி நெறிமுறைகள் மற்றும் பயிலரங்கு பாடத்திட்டங்களின் மின்பதிப்புகள்.',
                'Official digital copies of Kanaiyazhi journal, clinical protocol monographs, and workshop syllabus guides.'
              )}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/documents')}
            className="shrink-0 text-xs font-semibold text-[#132B20] hover:text-[#C85A32] inline-flex items-center gap-1.5 transition-colors self-start sm:self-end pb-1"
          >
            <span>{t('அனைத்து ஆவணங்களையும் பார்க்க', 'View Full Document Archive')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Documents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {previewDocs.map(doc => (
            <div
              key={doc.id}
              className="bg-white border border-[#E5DCD0] rounded-sm p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 group min-w-0 overflow-hidden"
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

                <h3 className="font-tamil-sans font-bold text-base text-[#19231D] group-hover:text-[#C85A32] transition-colors leading-snug mb-1.5 line-clamp-2">
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
                  <span>{t('வாசிக்க / திறக்க', 'Preview')}</span>
                </button>

                {doc.is_downloadable && (
                  <button
                    onClick={() => onSelectDocument(doc)}
                    className="py-2 px-3 bg-[#132B20] hover:bg-[#1E3E2F] text-white text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5"
                    title={t('பதிவிறக்கம்', 'Download PDF')}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
