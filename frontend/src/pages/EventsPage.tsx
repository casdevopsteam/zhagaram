import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export const EventsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { events } = useData();

  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const upcomingEvents = events.filter(e => e.is_upcoming);
  const pastEvents = events.filter(e => !e.is_upcoming);

  const displayedEvents =
    filter === 'upcoming'
      ? upcomingEvents
      : filter === 'past'
      ? pastEvents
      : events;

  return (
    <div className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Synopsis */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#C85A32]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
              {t('கல்வி நிகழ்வுகள் & பயிலரங்குகள்', 'Conferences & Symposia')}
            </span>
          </div>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#132B20] leading-tight">
            {t('நிகழ்வுகள் & கல்விப் பணிகள்', 'Academic Events, Workshops & Outreach')}
          </h1>

          <p className="text-sm md:text-base text-[#5C5044] font-tamil-sans mt-3 max-w-2xl leading-relaxed">
            {t(
              'அனைத்துலக மற்றும் மாநில அளவிலான தமிழ் மருத்துவக் கருத்தரங்குகள், கலைச்சொல்லாக்கப் பயிலரங்குகள் மற்றும் கிராமப்புற நல்வாழ்வு விழிப்புணர்வு முகாம்கள்.',
              'Official symposia, lexicographical seminars, faculty development workshops, and rural community health camps organized by Zhagaram Trust.'
            )}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#E5DCD0] pb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors ${
              filter === 'all'
                ? 'bg-[#132B20] text-white'
                : 'bg-white border border-[#DDD3C7] text-[#5C5044] hover:bg-[#F2ECE3]'
            }`}
          >
            {t('அனைத்து நிகழ்வுகளும்', 'All Initiatives')} ({events.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors ${
              filter === 'upcoming'
                ? 'bg-[#132B20] text-white'
                : 'bg-white border border-[#DDD3C7] text-[#5C5044] hover:bg-[#F2ECE3]'
            }`}
          >
            {t('வரவிருப்பவை', 'Upcoming')} ({upcomingEvents.length})
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors ${
              filter === 'past'
                ? 'bg-[#132B20] text-white'
                : 'bg-white border border-[#DDD3C7] text-[#5C5044] hover:bg-[#F2ECE3]'
            }`}
          >
            {t('நடந்து முடிந்தவை', 'Completed')} ({pastEvents.length})
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {displayedEvents.map(evt => (
            <div
              key={evt.id}
              className={`bg-white border rounded-sm overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-md min-w-0 ${
                evt.is_upcoming ? 'border-[#C85A32]/40 shadow-xs' : 'border-[#E5DCD0]'
              }`}
            >
              <div className="min-w-0">
                {/* Event Poster Image if available */}
                {evt.poster_image && (
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-[#132B20]/5 border-b border-[#EAE2D8] group">
                    <img
                      src={evt.poster_image}
                      alt={language === 'ta' ? evt.title_ta : evt.title_en}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-sm shadow-xs ${
                          evt.is_upcoming
                            ? 'bg-[#C85A32] text-white'
                            : 'bg-stone-800 text-stone-100'
                        }`}
                      >
                        {language === 'ta' ? evt.category_ta : evt.category_en}
                      </span>
                      {evt.highlight && (
                        <span className="text-[11px] font-semibold text-emerald-950 bg-emerald-100/90 backdrop-blur-xs px-2.5 py-0.5 rounded-sm shadow-xs">
                          {evt.highlight}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8 min-w-0">
                  {!evt.poster_image && (
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                          evt.is_upcoming
                            ? 'bg-[#C85A32]/10 text-[#C85A32]'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {language === 'ta' ? evt.category_ta : evt.category_en}
                      </span>

                      {evt.is_upcoming ? (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                          <Sparkles className="w-3 h-3" />
                          <span>{t('வரவிருக்கும் நிகழ்வு', 'Upcoming Event')}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#8C8074] bg-stone-100 px-2 py-0.5 rounded-sm">
                          {t('நிறைவுற்றது', 'Concluded')}
                        </span>
                      )}
                    </div>
                  )}

                  <h3 className="font-tamil-serif font-bold text-xl text-[#19231D] mb-3 leading-snug break-words">
                    {language === 'ta' ? evt.title_ta : evt.title_en}
                  </h3>

                  <p className="text-xs md:text-sm text-[#4A4036] mb-6 leading-relaxed break-words">
                    {language === 'ta' ? evt.description_ta : evt.description_en}
                  </p>

                  <div className="space-y-2 py-4 border-t border-b border-[#F2ECE3] text-xs text-[#5C5044]">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Calendar className="w-4 h-4 text-[#C85A32]" />
                        <span className="font-medium text-[#19231D]">{evt.date}</span>
                      </div>
                      <span className="text-[#C5B7A6]">·</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Clock className="w-4 h-4 text-[#786E63]" />
                        <span>{evt.time}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 min-w-0">
                      <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span className="leading-snug break-words line-clamp-2">{language === 'ta' ? evt.venue_ta : evt.venue_en}</span>
                    </div>
                    {evt.contact_person && (
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#786E63]">
                        <span className="font-semibold text-[#132B20]">{t('தொடர்பாளர்:', 'Contact:')}</span>
                        <span>{evt.contact_person} {evt.contact_phone ? `(${evt.contact_phone})` : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {evt.is_upcoming && evt.registration_open && evt.registration_url && (
                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                  <a
                    href={evt.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#132B20] hover:bg-[#1E3E2F] text-white text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{t('முன்பதிவு செய்ய (Register)', 'Register for this Event')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
