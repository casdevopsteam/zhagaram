import React, { useState, useMemo } from 'react';
import { Search, Play, Youtube, Clock, ExternalLink, UserCheck, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { VideoItem } from '../types';

interface VideosPageProps {
  onSelectVideo: (video: VideoItem) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ onSelectVideo }) => {
  const { language, t } = useLanguage();
  const { videos } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const publishedVideos = useMemo(() => {
    return videos.filter(v => v.status === 'published');
  }, [videos]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    publishedVideos.forEach(v => {
      set.add(language === 'ta' ? v.category : v.category_en);
    });
    return Array.from(set);
  }, [publishedVideos, language]);

  const filteredVideos = useMemo(() => {
    return publishedVideos.filter(v => {
      const title = (language === 'ta' ? v.title_ta : v.title_en).toLowerCase();
      const desc = (language === 'ta' ? v.description_ta : v.description_en).toLowerCase();
      const lecturer = (language === 'ta' ? v.lecturer_ta : v.lecturer_en).toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !q || title.includes(q) || desc.includes(q) || lecturer.includes(q);
      const matchesCategory =
        selectedCategory === 'all' ||
        (language === 'ta' ? v.category : v.category_en) === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [publishedVideos, searchQuery, selectedCategory, language]);

  const playlistUrl = 'https://youtube.com/playlist?list=PLqAGZgQ8AD2sxSFrSfhbHKMOjjxZ6CrHG';

  return (
    <div className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Synopsis */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#C85A32]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
              {t('காணொளி விரிவுரைக் கூடம்', 'Video Lecture Theater')}
            </span>
          </div>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#132B20] leading-tight">
            {t('மருத்துவக் காணொளிகள் & விரிவுரைகள்', 'Medical Lectures & Video Tutorials')}
          </h1>

          <p className="text-sm md:text-base text-[#5C5044] font-tamil-sans mt-3 max-w-2xl leading-relaxed">
            {t(
              'MBBS in Tamil விரிவுரைத் தொடர், உடற்கூறியல், உடலியங்கியல் பாட விளக்கங்கள் மற்றும் மருத்துவக் கலைச்சொல்லாக்க கருத்தரங்குப் பதிவுகள்.',
              'Authoritative curriculum video modules for medical undergraduate students, featuring expert clinical dissections, physiology concepts, and lexicographical forums.'
            )}
          </p>
        </div>

        {/* Featured MBBS in Tamil Banner Card */}
        <div className="p-6 md:p-8 bg-[#132B20] text-white rounded-sm mb-10 shadow-lg border border-[#234734]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E5A086] font-semibold mb-1">
                <Youtube className="w-4 h-4 text-red-400" />
                <span>{t('அதிகாரப்பூர்வ YouTube விரிவுரைத் தொடர்', 'Official YouTube Playlist')}</span>
              </div>
              <h2 className="font-tamil-serif text-xl sm:text-2xl font-bold text-white">
                MBBS in Tamil — {t('முழு விரிவுரை பிளேலிஸ்ட்', 'Full Lecture Video Playlist')}
              </h2>
              <p className="text-xs md:text-sm text-[#B3C7BB] mt-2 leading-relaxed">
                {t(
                  'உடற்கூறியல் மற்றும் அடிப்படை மருத்துவ அறிவியலைத் தமிழில் விளக்கும் தொடர் விரிவுரைகள். மாணவர்கள் மற்றும் மருத்துவர்களுக்கான இலவச திறந்தநிலைக் கல்வி.',
                  'Complete comprehensive lecture series detailing human anatomy and basic clinical sciences in Tamil for all medical learners.'
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs md:text-sm font-semibold rounded-sm transition-colors flex items-center gap-2 shadow-sm"
              >
                <Youtube className="w-4 h-4" />
                <span>{t('பிளேலிஸ்ட்டைத் திறக்க', 'Open Full Playlist')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white border border-[#E5DCD0] rounded-sm p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C8074] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('விரிவுரையின் தலைப்பு, பேராசிரியர் பெயர் மூலம் தேடுக...', 'Search by lecture title or professor...')}
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
              {t('அனைத்துக் காணொளிகள்', 'All Lectures')}
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

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#E5DCD0] rounded-sm p-8">
            <Youtube className="w-10 h-10 text-[#C5B7A6] mx-auto mb-3" />
            <h3 className="font-tamil-serif font-bold text-lg text-[#19231D] mb-1">
              {t('காணொளிகள் எதுவும் கிடைக்கவில்லை', 'No videos found')}
            </h3>
            <p className="text-xs text-[#786E63] font-serif italic">
              {t('தேடல் சொல்லை மாற்றியமைத்து மீண்டும் முயற்சிக்கவும்.', 'Try revising your keywords or clearing the category filter.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div
                key={video.id}
                onClick={() => onSelectVideo(video)}
                className="bg-white border border-[#E5DCD0] rounded-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
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
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 text-white font-serif text-5xl">
                      ழ
                    </div>
                  )}

                  <div className="relative z-20 w-12 h-12 rounded-full bg-[#C85A32] group-hover:bg-[#B54E29] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>

                  <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 bg-black/70 text-white rounded-xs text-[10px] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>

                  <div className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-black/50 text-[#E5A086] rounded-xs text-[10px] uppercase tracking-wider font-semibold">
                    {language === 'ta' ? video.category : video.category_en}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-tamil-sans font-bold text-base text-[#19231D] group-hover:text-[#C85A32] transition-colors leading-snug mb-2 line-clamp-2">
                      {language === 'ta' ? video.title_ta : video.title_en}
                    </h3>
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
                      <span>{t('இப்போது பார்க்க', 'Watch Video')}</span>
                    </span>
                    <Play className="w-3.5 h-3.5 fill-current" />
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
