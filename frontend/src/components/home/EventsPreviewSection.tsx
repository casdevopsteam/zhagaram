import React from 'react';
import { ArrowRight, Calendar, MapPin, Clock, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';

interface EventsPreviewSectionProps {
  onNavigate: (route: string) => void;
}

export const EventsPreviewSection: React.FC<EventsPreviewSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { events } = useData();

  const upcomingEvents = events.filter(e => e.is_upcoming).slice(0, 2);
  const recentEvents = events.filter(e => !e.is_upcoming).slice(0, 2);

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#EAE2D8]">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C85A32] block">
              {t('நிகழ்வுகள் & பயிலரங்குகள்', 'Conferences & Seminars')}
            </span>
            <h2 className="font-tamil-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#132B20] mt-1 break-words">
              {t('வரவிருக்கும் கல்வி மற்றும் மருத்துவ நிகழ்வுகள்', 'Upcoming & Recent Trust Initiatives')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/events')}
            className="shrink-0 text-xs font-semibold text-[#132B20] hover:text-[#C85A32] inline-flex items-center gap-1.5 transition-colors self-start sm:self-end pb-1"
          >
            <span>{t('அனைத்து நிகழ்வுகளையும் பார்க்க', 'View All Events')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Upcoming Events Column */}
          <div className="min-w-0 flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E5DCD0]">
              <span className="w-2.5 h-2.5 bg-[#C85A32] rounded-full shrink-0" />
              <h3 className="font-tamil-serif font-bold text-lg text-[#132B20]">
                {t('வரவிருக்கும் நிகழ்வுகள்', 'Upcoming Seminars')}
              </h3>
            </div>

            <div className="space-y-4 flex-1">
              {upcomingEvents.length === 0 ? (
                <div className="p-8 text-center bg-white border border-[#E5DCD0] rounded-sm text-xs text-[#786E63]">
                  {t('தற்போது புதிய நிகழ்வுகள் அறிவிக்கப்படவில்லை.', 'No upcoming events currently scheduled.')}
                </div>
              ) : (
                upcomingEvents.map(evt => (
                  <div
                    key={evt.id}
                    className="p-5 sm:p-6 bg-white border border-[#E5DCD0] rounded-sm hover:border-[#C85A32]/40 transition-colors shadow-2xs flex flex-col sm:flex-row gap-4 sm:gap-5 overflow-hidden min-w-0"
                  >
                    {evt.poster_image && (
                      <div className="w-full sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 rounded-xs overflow-hidden bg-[#132B20]/5 border border-[#EAE2D8] self-start">
                        <img
                          src={evt.poster_image}
                          alt={language === 'ta' ? evt.title_ta : evt.title_en}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#786E63] mb-1.5">
                          <span className="font-semibold text-[#C85A32] uppercase tracking-wider">
                            {language === 'ta' ? evt.category_ta : evt.category_en}
                          </span>
                          {evt.highlight && (
                            <>
                              <span className="text-[#C5B7A6]">·</span>
                              <span className="text-emerald-700 font-medium">{evt.highlight}</span>
                            </>
                          )}
                        </div>

                        <h4 className="font-tamil-sans font-bold text-base text-[#19231D] mb-1.5 leading-snug break-words">
                          {language === 'ta' ? evt.title_ta : evt.title_en}
                        </h4>

                        <p className="text-xs text-[#5C5044] mb-3 line-clamp-2 leading-relaxed break-words">
                          {language === 'ta' ? evt.description_ta : evt.description_en}
                        </p>

                        <div className="space-y-1.5 text-xs text-[#6B5F52] border-t border-[#F2ECE3] pt-2 mb-3">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <div className="flex items-center gap-1 shrink-0">
                              <Calendar className="w-3.5 h-3.5 text-[#C85A32]" />
                              <span>{evt.date}</span>
                            </div>
                            <span className="text-[#C5B7A6]">·</span>
                            <div className="flex items-center gap-1 shrink-0">
                              <Clock className="w-3.5 h-3.5 text-[#786E63]" />
                              <span>{evt.time}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5 min-w-0">
                            <MapPin className="w-3.5 h-3.5 text-[#C85A32] shrink-0 mt-0.5" />
                            <span className="line-clamp-1 break-words leading-tight">{language === 'ta' ? evt.venue_ta : evt.venue_en}</span>
                          </div>
                        </div>
                      </div>

                      {evt.registration_open && evt.registration_url && (
                        <div className="pt-1">
                          <a
                            href={evt.registration_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#132B20] hover:bg-[#1E3E2F] text-white text-xs font-semibold rounded-sm transition-colors"
                          >
                            <span>{t('பதிவு செய்ய (Register)', 'Register for Conclave')}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Past Events Column */}
          <div className="min-w-0 flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E5DCD0]">
              <span className="w-2.5 h-2.5 bg-[#786E63] rounded-full shrink-0" />
              <h3 className="font-tamil-serif font-bold text-lg text-[#132B20]">
                {t('நடந்து முடிந்த கல்விப் பணிகள்', 'Past Completed Initiatives')}
              </h3>
            </div>

            <div className="space-y-4 flex-1">
              {recentEvents.map(evt => (
                <div
                  key={evt.id}
                  className="p-5 sm:p-6 bg-white border border-[#E5DCD0] rounded-sm hover:border-[#786E63]/40 transition-colors shadow-2xs flex flex-col sm:flex-row gap-4 sm:gap-5 overflow-hidden min-w-0"
                >
                  {evt.poster_image && (
                    <div className="w-full sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 rounded-xs overflow-hidden bg-[#132B20]/5 border border-[#EAE2D8] self-start">
                      <img
                        src={evt.poster_image}
                        alt={language === 'ta' ? evt.title_ta : evt.title_en}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#786E63] mb-1.5">
                        <span className="font-semibold uppercase tracking-wider">
                          {language === 'ta' ? evt.category_ta : evt.category_en}
                        </span>
                        <span className="text-[#C5B7A6]">·</span>
                        <span>{evt.date}</span>
                      </div>

                      <h4 className="font-tamil-sans font-bold text-base text-[#19231D] mb-1.5 leading-snug break-words">
                        {language === 'ta' ? evt.title_ta : evt.title_en}
                      </h4>

                      <p className="text-xs text-[#5C5044] mb-3 line-clamp-2 leading-relaxed break-words">
                        {language === 'ta' ? evt.description_ta : evt.description_en}
                      </p>

                      <div className="flex items-start gap-1.5 text-xs text-[#786E63] pt-2 border-t border-[#F2ECE3] min-w-0">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="line-clamp-1 break-words leading-tight">{language === 'ta' ? evt.venue_ta : evt.venue_en}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#786E63] bg-[#F4EFEB] px-2 py-0.5 rounded-xs font-medium">
                        <CheckCircle2 className="w-3 h-3 text-[#786E63]" />
                        <span>{t('நிறைவுற்றது', 'Completed Initiative')}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
