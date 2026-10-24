import React from 'react';
import { ArrowRight, Play, Youtube, Clock, UserCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { VideoItem } from '../../types';

interface FeaturedVideosSectionProps {
  onNavigate: (route: string) => void;
  onSelectVideo: (video: VideoItem) => void;
}

export const FeaturedVideosSection: React.FC<FeaturedVideosSectionProps> = ({
  onNavigate,
  onSelectVideo,
}) => {
  const { language, t } = useLanguage();
  const { videos } = useData();

  const previewVideos = videos.filter(v => v.status === 'published').slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#EAE2D8]">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C85A32] block">
              {t('காணொளி விரிவுரைகள்', 'Video Lecture Repository')}
            </span>
            <h2 className="font-tamil-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#132B20] mt-1 break-words">
              {t('பேராசிரியர்களின் மருத்துவ விரிவுரைகள்', 'Medical Lectures by Renowned Faculty')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/videos')}
            className="shrink-0 text-xs font-semibold text-[#132B20] hover:text-[#C85A32] inline-flex items-center gap-1.5 transition-colors self-start sm:self-end pb-1"
          >
            <span>{t('அனைத்து காணொளிகளையும் காண்க', 'View Full Video Repository')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {previewVideos.map(video => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="bg-white border border-[#E5DCD0] rounded-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between min-w-0"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9] bg-[#152B20] flex items-center justify-center overflow-hidden">
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={language === 'ta' ? video.title_ta : video.title_en}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                
                {!video.thumbnail_url && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 text-white font-serif text-4xl">
                    ழ
                  </div>
                )}

                {/* Play Button Icon */}
                <div className="relative z-20 w-12 h-12 rounded-full bg-[#C85A32] group-hover:bg-[#B54E29] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 bg-black/70 text-white rounded-xs text-[10px] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>

                <div className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-black/50 text-[#E5A086] rounded-xs text-[10px] uppercase tracking-wider font-semibold">
                  {language === 'ta' ? video.category : video.category_en}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-tamil-sans font-bold text-base text-[#19231D] group-hover:text-[#C85A32] transition-colors leading-snug mb-2 line-clamp-2">
                    {language === 'ta' ? video.title_ta : video.title_en}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#786E63] mb-2">
                    <UserCheck className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>{language === 'ta' ? video.lecturer_ta : video.lecturer_en}</span>
                  </div>
                  <p className="text-xs text-[#5C5044] line-clamp-2 leading-relaxed">
                    {language === 'ta' ? video.description_ta : video.description_en}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#F2ECE3] flex items-center justify-between text-xs text-[#C85A32] font-semibold">
                  <span className="flex items-center gap-1">
                    <Youtube className="w-3.5 h-3.5" />
                    <span>{t('இப்போது பார்க்க', 'Watch Lecture')}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
