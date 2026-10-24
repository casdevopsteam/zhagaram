import React from 'react';
import { X, ExternalLink, Youtube, Clock, UserCheck } from 'lucide-react';
import { VideoItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface VideoPlayerModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  const { language, t } = useLanguage();

  if (!video) return null;

  const isDirectVideo = !!video.direct_video_url;

  // Determine iframe source: If playlist or specific video
  const embedUrl = video.playlist_id
    ? `https://www.youtube.com/embed/videoseries?list=${video.playlist_id}`
    : `https://www.youtube.com/embed/${video.youtube_id}?autoplay=1`;

  const externalUrl = isDirectVideo
    ? video.direct_video_url
    : video.playlist_id
    ? `https://youtube.com/playlist?list=${video.playlist_id}`
    : `https://www.youtube.com/watch?v=${video.youtube_id}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 md:p-6 animate-in fade-in duration-150">
      <div
        className="max-w-4xl w-full bg-[#FAF8F5] border border-[#E0D7CC] rounded-sm shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-[#132B20] text-white flex items-center justify-between">
          <div className="flex items-center gap-2 truncate pr-4">
            <Youtube className="w-5 h-5 text-red-500 shrink-0" />
            <span className="text-xs uppercase tracking-wider text-[#A6B8AC]">
              {language === 'ta' ? video.category : video.category_en}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isDirectVideo ? (
              <a
                href={video.direct_video_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 text-xs text-[#E5A086] hover:text-white transition-colors"
              >
                <span>{t('நேரடி காணொளி', 'Direct Video File')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#E5A086] hover:text-white transition-colors"
              >
                <span>{t('YouTube-இல் திறக்க', 'Open in YouTube')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white rounded-sm transition-colors"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Frame */}
        <div className="relative w-full aspect-[16/9] bg-black">
          {isDirectVideo ? (
            <video
              controls
              autoPlay
              className="w-full h-full object-contain bg-black"
              poster={video.thumbnail_url}
            >
              <source src={video.direct_video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={embedUrl}
              title={language === 'ta' ? video.title_ta : video.title_en}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>

        {/* Video Details & Meta */}
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 pb-4 border-b border-[#E8DFD5]">
            <div>
              <h2 className="font-tamil-serif text-xl md:text-2xl font-bold text-[#132B20] leading-tight mb-2">
                {language === 'ta' ? video.title_ta : video.title_en}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#786E63]">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>
                    {language === 'ta' ? video.lecturer_ta : video.lecturer_en}
                  </span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#786E63]" />
                  <span>{video.duration}</span>
                </span>
                {video.playlist_title_ta && (
                  <>
                    <span>·</span>
                    <span className="font-serif italic text-[#C85A32]">
                      {language === 'ta' ? video.playlist_title_ta : video.playlist_title_en}
                    </span>
                  </>
                )}
              </div>
            </div>

            <a
              href="https://youtube.com/playlist?list=PLqAGZgQ8AD2sxSFrSfhbHKMOjjxZ6CrHG"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs font-semibold rounded-sm transition-colors shrink-0 flex items-center gap-2"
            >
              <Youtube className="w-4 h-4" />
              <span>{t('முழு பிளேலிஸ்ட்டைப் பார்க்க', 'Watch Full Playlist')}</span>
            </a>
          </div>

          <div className="text-xs md:text-sm text-[#4A4036] leading-relaxed">
            <h4 className="font-semibold text-xs text-[#132B20] uppercase tracking-wider mb-1">
              {t('விரிவுரை விளக்கம்', 'Lecture Synopsis')}
            </h4>
            <p className="font-tamil-sans">
              {language === 'ta' ? video.description_ta : video.description_en}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
