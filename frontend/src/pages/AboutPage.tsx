import { Target, BookOpen, HeartPulse, GraduationCap, CheckCircle2, ShieldCheck, Mail, MapPin, Sparkles, Award, Globe, Youtube, FileText, ExternalLink, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { TrustLogo, BookCoverGraphic } from '../components/common/VisualAsset';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { settings } = useData();

  const objectives = [
    {
      title_ta: 'தமிழ் வழி மருத்துவப் பாடத்திட்டம்',
      title_en: 'Tamil-Medium Medical Curriculum',
      desc_ta: 'மருத்துவக் கல்லூரி மாணவர்களுக்கு மனித உடற்கூறியல், உடலியங்கியல், நோய்க்குறியியல் மற்றும் மருந்தியல் ஆகிய முதன்மைப் பாடங்களை எளிய, துல்லியமான தமிழில் வழங்குதல்.',
      desc_en: 'Authoring and validating foundational medical textbooks—Anatomy, Physiology, Pathology, and Pharmacology—in lucid, semantically precise Tamil.',
    },
    {
      title_ta: 'செம்மையான மருத்துவக் கலைச்சொல்லாக்கம்',
      title_en: 'Rigorous Medical Lexicography',
      desc_ta: 'ஆங்கில மருத்துவச் சொற்களுக்கு இணையான தமிழ்ச் சொற்களை வேர்ச்சொல் ஆய்வு மற்றும் இலக்கணக் கோட்பாடுகளின்படி உருவாக்கி களஞ்சியங்களாக வெளியிடுதல்.',
      desc_en: 'Etymologically anchored standardization of allopathic clinical terms into coherent Tamil terminology adhering to classical morphosyntax.',
    },
    {
      title_ta: 'இலவச திறந்தவெளி டிஜிட்டல் கல்வி',
      title_en: 'Open-Access Digital Repository',
      desc_ta: 'விரிவுரைக் காணொளிகள், மாதிரி வினாத்தாள்கள் மற்றும் மருத்துவ ஆவணங்களை மாணவர்கள் எவ்வித கட்டணமுமின்றி இணையவழியே அணுக வகைசெய்தல்.',
      desc_en: 'Providing open-access high-definition video lecture playlists and digital PDF documents to empower students regardless of socioeconomic barriers.',
    },
    {
      title_ta: 'கிராமப்புற மக்கள் நல்வாழ்வு விழிப்புணர்வு',
      title_en: 'Grassroots Preventative Health',
      desc_ta: 'மருத்துவ மற்றும் சுகாதார விழிப்புணர்வை தாய்மொழியில் எளிய மக்களிடம் கொண்டு சேர்த்து ஆரோக்கியமான சமுதாயத்தை உருவாக்குதல்.',
      desc_en: 'Conducting rural community health camps and circulating mother-tongue preventative healthcare literature to build healthier grassroots communities.',
    },
  ];

  const advisoryMembers = [
    {
      name_ta: 'பேராசிரியர் மரு. க. கார்த்திகேயன், MS',
      name_en: 'Prof. Dr. K. Karthikeyan, MS',
      role_ta: 'உடற்கூறியல் துறைத் தலைவர் & கல்வி ஆலோசகர்',
      role_en: 'Head of Anatomy & Academic Advisory Board',
      bio_ta: 'மூன்று தசாப்தங்களுக்கும் மேலாக அரசு மருத்துவக் கல்லூரிகளில் உடற்கூறியல் பேராசிரியராகப் பணியாற்றி, தமிழ் வழி மருத்துவப் பாடநூல்களை செம்மைப்படுத்தியவர்.',
      bio_en: 'Over 30 years of clinical and academic teaching experience in Government Medical Colleges, leading the Tamil Anatomy textbook initiative.',
    },
    {
      name_ta: 'முனைவர் க. சுப்பிரமணியன், Ph.D.',
      name_en: 'Dr. K. Subramanian, Ph.D.',
      role_ta: 'முதன்மை மொழியியல் மற்றும் கலைச்சொல்லாக்க ஆய்வாளர்',
      role_en: 'Chief Lexicographer & Linguistic Advisor',
      bio_ta: 'அறிவியல் மற்றும் மருத்துவ கலைச்சொல் உருவாக்கத்தில் தனித்துவமான ஆய்வுப் பங்களிப்பை வழங்கிய மூத்த தமிழ் மொழியியல் அறிஞர்.',
      bio_en: 'Distinguished lexicographer who has spearheaded the coinage and validation of over 15,000 modern scientific and clinical terms.',
    },
    {
      name_ta: 'மரு. ச. மீனாட்சி, MD (Physiology)',
      name_en: 'Dr. S. Meenakshi, MD (Physiology)',
      role_ta: 'உடலியங்கியல் விரிவுரை ஒருங்கிணைப்பாளர்',
      role_en: 'Physiology Lecture Series Lead',
      bio_ta: 'மருத்துவ மாணவர்களுக்கான இதய சுற்றோட்டம் மற்றும் நரம்பியல் உடலியங்கியல் விரிவுரைகளை தமிழில் எளிமையாக வடிவமைத்தவர்.',
      bio_en: 'Physiology specialist dedicated to delivering conceptual video modules and illustrated lecture notes in Tamil.',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <TrustLogo size={32} />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
              {t('எங்களைப் பற்றி · அறக்கட்டளையின் நோக்கு', 'About Zhagaram Trust · Foundations')}
            </span>
          </div>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#132B20] leading-tight">
            {t(
              'தாய்மொழியில் அறிவோம். அறிவியலில் உயர்வோம்.',
              'Learn in Your Language. Grow Through Knowledge.'
            )}
          </h1>

          <p className="font-serif italic text-base md:text-lg text-[#5C5044] mt-3">
            {t(
              'ழகரம் அறக்கட்டளையின் கல்வி மற்றும் அறிவியல் ஆவணப் பணி',
              'The Mission & Vision of Zhagaram Educational & Medical Foundation'
            )}
          </p>
          <div className="w-16 h-0.5 bg-[#C85A32] mx-auto mt-6" />
        </div>

        {/* Editorial Vision & Mission Section */}
        <div className="bg-white border border-[#E5DCD0] rounded-sm p-8 md:p-12 mb-16 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-2">
                <Target className="w-4 h-4" />
                <span>{t('எங்கள் தொலைநோக்குப் பார்வை (Vision)', 'Our Vision')}</span>
              </div>
              <h2 className="font-tamil-serif font-bold text-xl md:text-2xl text-[#132B20] mb-3">
                {t('அறிவியல் அறிவை தாய்மொழியில் அடைதல்', 'Democratizing Higher Medical Education')}
              </h2>
              <p className="text-xs md:text-sm text-[#4A4036] leading-relaxed font-tamil-sans">
                {t(
                  'மருத்துவம், அறிவியல் மற்றும் உயர்தொழில்நுட்ப அறிவு எந்தவொரு மொழித் தடையுமின்றி ஒவ்வொரு தமிழ் மாணவருக்கும் எட்டக்கூடியதாக இருக்க வேண்டும். தாய்மொழியில் சிந்திப்பதும் கற்பதும் அறிவின் ஆழத்தையும் படைப்பாற்றலையும் மேம்படுத்துகிறது.',
                  'To eradicate linguistic barriers in healthcare education, enabling every student to master clinical and scientific sciences in Tamil, elevating deep cognitive comprehension, clinical empathy, and research excellence.'
                )}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E4D38] mb-2">
                <HeartPulse className="w-4 h-4" />
                <span>{t('எங்கள் செயல்நோக்கம் (Mission)', 'Our Mission')}</span>
              </div>
              <h2 className="font-tamil-serif font-bold text-xl md:text-2xl text-[#132B20] mb-3">
                {t('செம்மையான பாடநூல்களும் காணொளிகளும்', 'World-Class Textbooks & Open Pedagogy')}
              </h2>
              <p className="text-xs md:text-sm text-[#4A4036] leading-relaxed font-tamil-sans">
                {t(
                  'தேசிய மருத்துவ ஆணையத்தின் வழிகாட்டுதலுக்கு உட்பட்டு, மருத்துவ இளநிலைப் பட்டப் படிப்பிற்கான (MBBS) தரமான தமிழ் பாடநூல்கள், கலைச்சொல் அகராதிகள் மற்றும் விரிவுரைக் காணொளிகளை உருவாக்கி இலவசமாகவும் நியாயமான விலையிலும் வழங்குதல்.',
                  'To author accredited bilingual textbooks, compile authoritative medical glossaries, record video lecture series, and conduct grassroots health awareness camps in full transparency and rigorous scholarship.'
                )}
              </p>
            </div>
          </div>
        </div>
        {/* Patrons Section */}
        <section id="patron" className="mb-16 scroll-mt-24 space-y-8">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C85A32] text-white rounded-xs text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('அறக்கட்டளையின் வழிகாட்டும் புரவலர் பெருமக்கள்', 'Patrons & Guiding Luminaries')}</span>
            </div>
            <h2 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-[#132B20]">
              {t('தாய்மொழி வழி மருத்துவக் கல்விக்கு வழிகாட்டும் பெருந்தகைகள்', 'Eminent Mentors Guiding Tamil Medical Education')}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4036] mt-2 font-tamil-sans">
              {t(
                'ழகரம் அறக்கட்டளையின் மருத்துவத் தமிழ்ப் பாடத்திட்டம், அறிவியல் மொழிபெயர்ப்பு மற்றும் கலைச்சொல்லாக்கப் பணிகளுக்கு முன்னோடிகளாக விளங்கி நல்வழிகாட்டும் புரவலர் பெருமக்கள்.',
                'Distinguished mentors whose lifetime devotion to clinical excellence and scientific Tamil illuminates the path of Zhagaram Trust.'
              )}
            </p>
          </div>

          {/* Patron 1: Dr. S. Narendran */}
          <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-[#12261C] via-[#1A382B] to-[#0F1E16] border-2 border-[#E5A086]/50 p-6 sm:p-8 lg:p-10 shadow-xl">
            {/* Decorative watermark icon */}
            <div className="absolute -right-8 -bottom-8 text-white/[0.03] pointer-events-none select-none">
              <GraduationCap className="w-72 h-72" />
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Photo & Quick Badges Column */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="relative w-48 sm:w-56 aspect-[4/5] rounded-sm overflow-hidden border-2 border-[#E5A086]/70 shadow-2xl bg-[#0B1711] group">
                    <img
                      src="/assets/patron/patron-narendran.jpg"
                      alt={language === 'ta' ? 'புரவலர் மரு. சு. நரேந்திரன்' : 'Patron Dr. S. Narendran'}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
                      <span className="text-[11px] font-serif text-[#F4EFEB] tracking-wide block">
                        {t('தஞ்சாவூர்', 'Thanjavur')}
                      </span>
                    </div>
                  </div>

                  {/* Kalaimamani Honor Ribbon */}
                  <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/15 border border-amber-300/30 text-amber-200 text-xs font-medium rounded-xs">
                    <Award className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{t('கலைமாமணி விருது (2010)', 'Kalaimamani Award (2010)')}</span>
                  </div>
                </div>

                {/* Narrative & Links Column */}
                <div className="lg:col-span-8 min-w-0">
                  <div className="inline-block px-2.5 py-0.5 bg-white/10 text-emerald-200 text-[11px] font-semibold uppercase tracking-wider rounded-xs mb-2">
                    {t('முதன்மைப் புரவலர்', 'Chief Patron')}
                  </div>
                  <h3 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                    {t('மருத்துவத் தமிழ்ச் செம்மல் மரு. சு. நரேந்திரன், MS, FICS', 'Medical Tamil Scholar Dr. S. Narendran, MS, FICS')}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E5A086] font-semibold mb-4">
                    {t(
                      'முன்னாள் அறுவை சிகிச்சை பேராசிரியர், தஞ்சை மருத்துவக் கல்லூரி | 37-க்கும் மேற்பட்ட தேசிய & மாநில விருதுகள்',
                      'Former Professor of Surgery, Thanjavur Medical College | 37+ National & State Honours'
                    )}
                  </p>

                  <p className="text-xs sm:text-sm text-[#D1E0D7] leading-relaxed mb-4 font-tamil-sans">
                    {t(
                      '1970 முதல் 2000 வரை தொடர்ந்து 30 ஆண்டுகள் அரசு மருத்துவக் கல்லூரியில் அறுவை சிகிச்சை பேராசிரியராகப் பணியாற்றி, நோயாளிகளுக்கு அருந்தொண்டாற்றியதோடு பலநூறு மருத்துவ மாணவர்களுக்கும் செவிலியர்களுக்கும் மருத்துவப் பாடம் புகட்டியவர். எளிய மக்களுக்கும் மாணவர்களுக்கும் தாய்மொழியில் அறிவியல் மற்றும் மருத்துவ அறிவைக் கொண்டு சேர்க்கும் ழகரம் அறக்கட்டளையின் வழிகாட்டும் கலங்கரை விளக்கமாகத் திகழ்கிறார்.',
                      'A veteran surgical professor who dedicated over 30 years (1970–2000) to clinical care and teaching at Government Medical Colleges, training generations of doctors and nurses. He serves as the guiding beacon for Zhagaram Trust in demystifying healthcare and medical science in Tamil.'
                    )}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-xl font-bold text-[#E5A086]">30+</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('மருத்துவ நூல்கள்', 'Medical Books')}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-xl font-bold text-[#E5A086]">30</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('ஆண்டுகள் அரசு பணி', 'Years in Surgery')}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-xl font-bold text-[#E5A086]">37+</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('விருதுகள் & பட்டங்கள்', 'Awards & Honors')}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-xl font-bold text-[#E5A086]">130+</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('மருத்துவ உரைகள்', 'Clinical Lectures')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#B3C7BB] leading-relaxed mb-5 italic font-serif">
                    {t(
                      'தமிழக அரசின் சிறந்த நூல் விருது பெற்ற "நோயை வெல்வோம்" (1985), தமிழ்ப் பல்கலைக்கழகத்தின் "பொது அறுவை மருத்துவம்", "இரத்த தானம், உடல் உறுப்பு தானம்" உள்ளிட்ட முன்னோடி மருத்துவப் படைப்புகளின் ஆசிரியர்.',
                      'Author of seminal Tamil medical treatises including Tamil Nadu State Award-winning "Noyai Velvom" (1985), "General Surgery" (Tamil University), and "Organ Donation".'
                    )}
                  </p>

                  {/* Links from Document */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/15">
                    {/* 1. Wikipedia Link */}
                    <a
                      href="https://ta.wikipedia.org/wiki/%E0%AE%9A%E0%AF%81._%E0%AE%A8%E0%AE%B0%E0%AF%87%E0%AE%A8%E0%AF%8D%E0%AE%A4%E0%AE%BF%E0%AE%B0%E0%AE%A9%E0%AF%8D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Wikipedia Profile of Dr. S. Narendran"
                    >
                      <Globe className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t('விக்கிப்பீடியா பக்கம்', 'Wikipedia Profile')}</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>

                    {/* 2. YouTube Video Link */}
                    <a
                      href="https://youtu.be/9VvInopc7pM?si=kNPXPsIPqPKnijIk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600/90 hover:bg-red-600 border border-red-500 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Watch Dr. S. Narendran Discourse on YouTube"
                    >
                      <Youtube className="w-3.5 h-3.5 text-white" />
                      <span>{t('மருத்துவ உரை (YouTube)', 'Watch on YouTube')}</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>

                    {/* 3. HTML Page Link (Dr. Mu. Elangovan Blog Feature) */}
                    <a
                      href="https://muelangovan.blogspot.com/2015/03/blog-post_18.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Read Documented Biography by Dr. Mu. Elangovan"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-300" />
                      <span>{t('வாழ்க்கைக் குறிப்பு (HTML கட்டுரை)', 'Biography Article (HTML)')}</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Patron 2: Prof. Dr. Semmal Manavai Mustafa */}
          <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-[#12261C] via-[#1A382B] to-[#0F1E16] border-2 border-[#E5A086]/50 p-6 sm:p-8 lg:p-10 shadow-xl">
            {/* Decorative watermark icon */}
            <div className="absolute -right-8 -bottom-8 text-white/[0.03] pointer-events-none select-none">
              <BookOpen className="w-72 h-72" />
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Photo & Quick Badges Column */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="relative w-48 sm:w-56 aspect-[4/5] rounded-sm overflow-hidden border-2 border-[#E5A086]/70 shadow-2xl bg-[#0B1711] group">
                    <img
                      src="/assets/patron/patron-semmal.jpg"
                      alt={language === 'ta' ? 'புரவலர் பேராசிரியர் மரு. செம்மல் மணவை முஸ்தபா' : 'Patron Prof. Dr. Semmal Manavai Mustafa'}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
                      <span className="text-[11px] font-serif text-[#F4EFEB] tracking-wide block">
                        {t('சவுதி அரேபியா / சென்னை', 'Shaqra, KSA / Chennai')}
                      </span>
                    </div>
                  </div>

                  {/* Heritage Ribbon */}
                  <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/15 border border-amber-300/30 text-amber-200 text-xs font-medium rounded-xs text-center">
                    <Award className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{t('அறிவியல் தமிழ்த் தந்தை மணவை முஸ்தபா புதல்வர்', 'Son of Scientific Tamil Pioneer Manavai Mustafa')}</span>
                  </div>
                </div>

                {/* Narrative & Links Column */}
                <div className="lg:col-span-8 min-w-0">
                  <div className="inline-block px-2.5 py-0.5 bg-white/10 text-emerald-200 text-[11px] font-semibold uppercase tracking-wider rounded-xs mb-2">
                    {t('புரவலர் & அறிவியல் ஆலோசகர்', 'Patron & Chief Scientific Advisor')}
                  </div>
                  <h3 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                    {t('பேராசிரியர் மரு. செம்மல் மணவை முஸ்தபா, MBBS', 'Prof. Dr. Semmal Manavai Mustafa, MBBS')}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E5A086] font-semibold mb-4">
                    {t(
                      'மருத்துவக் கல்விப் பேராசிரியர், ஷக்ரா பல்கலைக்கழகம் (சவுதி அரேபியா) | முன்னாள் உடலியங்கியல் இணைப் பேராசிரியர், ஸ்ரீ ராமச்சந்திரா பல்கலைக்கழகம்',
                      'Professor of Medical Education, Shaqra University, KSA | Former Assoc. Prof of Physiology, Sri Ramachandra University'
                    )}
                  </p>

                  <p className="text-xs sm:text-sm text-[#D1E0D7] leading-relaxed mb-4 font-tamil-sans">
                    {t(
                      'சென்னை ஸ்டான்லி மருத்துவக் கல்லூரியின் முன்னாள் மாணவரான (MBBS, 1995) மரு. செம்மல் அவர்கள், 29 ஆண்டுகளுக்கும் மேலான சர்வதேச மருத்துவ, கல்வி மற்றும் உடலியங்கியல் கற்பித்தல் அனுபவம் கொண்டவர். மணவை முஸ்தபா அறிவியல் தமிழ் அறக்கட்டளையின் நிர்வாக இயக்குநராகவும், சர்வதேச பயன்பாட்டுத் தமிழ் இணையக் குழுமம் & ஆவணகத்தின் (The Tamil Archives) தலைமை அறிவியல் ஆலோசகராகவும் செயல்படுகிறார். பழந்தமிழ் இலக்கியக் கோட்பாடுகளைக் கொண்டு நவீன மருத்துவக் கல்வியைக் கற்பிக்கும் முன்னோடி கல்வி ஆய்வு முறையை (Philocine) உலக அரங்கில் முன்னெடுத்து வருகிறார்.',
                      'An alumnus of Govt. Stanley Medical College (MBBS, 1995) with over 29 years of clinical and academic teaching excellence across physiology and medical education. Managing Director of the Manavai Mustafa Scientific Tamil Foundation and Chief Scientific Advisor of The Tamil Archives, he pioneers integrating classical Tamil literature with modern clinical learning.'
                    )}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-xl font-bold text-[#E5A086]">29+</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('ஆண்டுகள் மருத்துவப் பணி', 'Years in Medicine')}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-lg font-bold text-[#E5A086] truncate">ஷக்ரா</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('பல்கலைக்கழகப் பேராசிரியர்', 'Prof. Shaqra Univ')}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-lg font-bold text-[#E5A086] truncate">மணவை</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('அறக்கட்டளை இயக்குநர்', 'Tamil Foundation')}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-lg font-bold text-[#E5A086] truncate">பழந்தமிழ்</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('மருத்துவக் கல்வி ஆய்வு', 'Ancient Medicine')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#B3C7BB] leading-relaxed mb-5 italic font-serif">
                    {t(
                      '"10,000 ஆண்டுகளுக்கு முன்னரே ஆதி மனிதன் மூளை பற்றி என்ன அறிவான்?" மற்றும் "பழந்தமிழ் இலக்கியங்கள் வழி மருத்துவக் கல்வி கற்பித்தல்" ஆகிய தலைப்புகளில் உலகளாவிய ஆய்வுரைகளையும் விழிப்புணர்வுக் காணொளிகளையும் வழங்கி வருபவர்.',
                      'Key contributor of acclaimed studies and discourses on ancient neurological insights and imparting health sciences through classical Tamil heritage.'
                    )}
                  </p>

                  {/* Links from Document */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/15">
                    {/* 1. LinkedIn Link */}
                    <a
                      href="https://www.linkedin.com/in/appliedtamil/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0077B5]/90 hover:bg-[#0077B5] border border-sky-400/50 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="LinkedIn Profile of Prof. Dr. Semmal"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-white" />
                      <span>{t('LinkedIn பக்கம்', 'LinkedIn Profile')}</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>

                    {/* 2. YouTube Video 1: Ancient Tamil Medical Education */}
                    <a
                      href="https://youtu.be/zQNvd3U3xds?si=wj4eRbYKUsXoTZlH"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600/90 hover:bg-red-600 border border-red-500 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Watch Discourse on Imparting Medical Education using Ancient Tamil Works"
                    >
                      <Youtube className="w-3.5 h-3.5 text-white" />
                      <span>{t('பழந்தமிழ் & மருத்துவம் (YouTube)', 'Ancient Tamil & Medicine (YouTube)')}</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>

                    {/* 3. YouTube Video 2: Ancient Man & Brain Knowledge */}
                    <a
                      href="https://youtu.be/MMh6dQyxqsE?si=pTucxnsu-SBZq39I"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600/90 hover:bg-red-600 border border-red-500 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Watch Discourse on 10,000 Years Ago: Ancient Man & Brain Knowledge"
                    >
                      <Youtube className="w-3.5 h-3.5 text-white" />
                      <span>{t('ஆதி மனிதனும் மூளையும் (YouTube)', 'Brain Evolution Discourse (YouTube)')}</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>

                    {/* 4. The Tamil Archives Website */}
                    <a
                      href="http://www.tamilarchives.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Visit The Tamil Archives"
                    >
                      <Globe className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t('தமிழ் ஆவணகம் (இணையதளம்)', 'The Tamil Archives')}</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>

                    {/* 5. Email */}
                    <a
                      href="mailto:thetamilarchives@gmail.com"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Email The Tamil Archives"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-300" />
                      <span>{t('மின்னஞ்சல்', 'Email')}</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Patron 3: Dr. M. Arulpitchai Narayanan */}
          <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-[#12261C] via-[#1A382B] to-[#0F1E16] border-2 border-[#E5A086]/50 p-6 sm:p-8 lg:p-10 shadow-xl">
            {/* Decorative watermark icon */}
            <div className="absolute -right-8 -bottom-8 text-white/[0.03] pointer-events-none select-none">
              <ShieldCheck className="w-72 h-72" />
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Photo & Quick Badges Column */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="relative w-48 sm:w-56 aspect-[4/5] rounded-sm overflow-hidden border-2 border-[#E5A086]/70 shadow-2xl bg-[#0B1711] group">
                    <img
                      src="/assets/patron/patron-arulpitchai.jpg"
                      alt={language === 'ta' ? 'புரவலர் மரு. மு. அருள்பிச்சை நாராயணன்' : 'Patron Dr. M. Arulpitchai Narayanan'}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
                      <span className="text-[11px] font-serif text-[#F4EFEB] tracking-wide block">
                        {t('சென்னை (MMC)', 'Chennai (MMC)')}
                      </span>
                    </div>
                  </div>

                  {/* MMC Alumni Ribbon */}
                  <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/15 border border-amber-300/30 text-amber-200 text-xs font-medium rounded-xs text-center">
                    <Award className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{t('செயலாளர், சென்னை மருத்துவக் கல்லூரி முன்னாள் மாணவர் சங்கம்', 'Secretary, MMC Alumni Association')}</span>
                  </div>
                </div>

                {/* Narrative & Links Column */}
                <div className="lg:col-span-8 min-w-0">
                  <div className="inline-block px-2.5 py-0.5 bg-white/10 text-emerald-200 text-[11px] font-semibold uppercase tracking-wider rounded-xs mb-2">
                    {t('புரவலர் & மருத்துவ ஆலோசகர்', 'Patron & Medical Advisor')}
                  </div>
                  <h3 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                    {t('மருத்துவ அறிஞர் மரு. மு. அருள்பிச்சை நாராயணன், MS', 'Medical Scholar Dr. M. Arulpitchai Narayanan, MS')}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E5A086] font-semibold mb-4">
                    {t(
                      'முன்னாள் முதல்வர் & அறுவை சிகிச்சை பேராசிரியர், சென்னை மருத்துவக் கல்லூரி (MMC) | தலைவர், ஆர்மா மருத்துவ அறக்கட்டளை',
                      'Former Dean & Professor of Surgery, Madras Medical College (MMC) | Chairman, Arma Medical Foundation'
                    )}
                  </p>

                  <p className="text-xs sm:text-sm text-[#D1E0D7] leading-relaxed mb-4 font-tamil-sans">
                    {t(
                      'சென்னை மருத்துவக் கல்லூரியின் (Madras Medical College - MMC) முன்னாள் மாணவரும், அங்கு அறுவை சிகிச்சை துறையின் பேராசிரியராகவும் முதல்வராகவும் (Dean) பணியாற்றி பல்லாயிரக்கணக்கான எளிய மக்களுக்கு அருந்தொண்டாற்றிய மூத்த அறுவை சிகிச்சை நிபுணர். சென்னை மருத்துவக் கல்லூரி முன்னாள் மாணவர் சங்கத்தின் (Alumni Association of MMC) செயலாளராகவும், 1993 முதல் மக்கள் நலப்பணியாற்றி வரும் ஆர்மா மருத்துவ அறக்கட்டளையின் (Arma Medical Foundation) தலைவராகவும் இயங்கி வருகிறார். உலக மறுவாழ்வு நிதி (WRF), உலக சுகாதார அமைப்பின் (WHO) திட்டங்கள் மற்றும் "ARMA Medical Practitioner" மருத்துவ இதழ் வாயிலாகத் தாய்மொழியில் மருத்துவ விழிப்புணர்வையும் மாணவர்களுக்கான வழிகாட்டலையும் முன்னெடுத்து வரும் ழகரத்தின் வழிகாட்டும் புரவலர்.',
                      'A veteran surgeon, clinical educator, and administrator who served as Professor of Surgery and Dean at the historic Madras Medical College (MMC). He currently serves as Secretary of the MMC Alumni Association and Chairman of the Arma Medical Foundation (active since 1993). Championing public health through the World Rehabilitation Fund (WRF), WHO Healthy City initiatives, and medical journalism, he provides authoritative guidance to Zhagaram Trust.'
                    )}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-xl font-bold text-[#E5A086]">35+</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('ஆண்டுகள் அறுவை சிகிச்சை', 'Years in Surgery')}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-lg font-bold text-[#E5A086] truncate">MMC</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('முன்னாள் முதல்வர் & செயலர்', 'Former Dean & Secretary')}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-lg font-bold text-[#E5A086] truncate">ARMA</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('மருத்துவ அறக்கட்டளை', 'Arma Foundation')}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs text-center">
                      <span className="block text-lg font-bold text-[#E5A086] truncate">WRF</span>
                      <span className="text-[11px] text-[#A6B8AC]">
                        {t('மறுவாழ்வு & பொதுநலம்', 'Rehabilitation / WRF')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#B3C7BB] leading-relaxed mb-5 italic font-serif">
                    {t(
                      'சென்னை மருத்துவக் கல்லூரியின் 180+ ஆண்டுகால வரலாற்றுப் பாரம்பரியத்தைப் பாதுகாத்தல், மருத்துவச் சட்டங்கள் மற்றும் மருத்துவக் கல்வி சீரமைப்பு குறித்த வழிகாட்டல்களைத் தொடர்ச்சியாக வழங்கி வருபவர்.',
                      'A tireless advocate for institutional heritage preservation at MMC, medical jurisprudence reforms, and vernacular medical literature accessibility.'
                    )}
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/15">
                    {/* 1. MMC Alumni Association Website */}
                    <a
                      href="https://www.alumnimmc.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Visit MMC Alumni Association Website"
                    >
                      <Globe className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t('சென்னை மருத்துவக் கல்லூரி சங்கம் (MMC)', 'MMC Alumni Association')}</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>

                    {/* 2. Arma Medical Foundation Website */}
                    <a
                      href="http://armafoundation.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Visit Arma Medical Foundation"
                    >
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t('ஆர்மா மருத்துவ அறக்கட்டளை', 'Arma Medical Foundation')}</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>

                    {/* 3. News & Media Coverage on The Hindu */}
                    <a
                      href="https://www.thehindu.com/news/cities/chennai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Medical Heritage and Media Mentions"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-300" />
                      <span>{t('செய்திகள் & ஊடகக் குறிப்புகள்', 'News & Heritage Notes')}</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>

                    {/* 4. Email */}
                    <a
                      href="mailto:alumnimmc@gmail.com"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xs text-xs font-semibold text-white transition-all shadow-2xs"
                      title="Email Dr. Arulpitchai Narayanan (MMC Alumni Office)"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-300" />
                      <span>{t('மின்னஞ்சல் (MMC Alumni)', 'Email MMC Alumni')}</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Core Objectives List */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C85A32]">
              {t('முக்கிய இலக்குகள்', 'Key Objectives')}
            </span>
            <h2 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-[#132B20] mt-1">
              {t('அறக்கட்டளையின் நான்கு தூண்கள்', 'Four Foundational Pillars')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {objectives.map((obj, i) => (
              <div key={i} className="p-6 bg-white border border-[#E5DCD0] rounded-sm shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C85A32] mb-2">
                  <span>0{i + 1}.</span>
                  <span className="uppercase tracking-wider">
                    {language === 'ta' ? obj.title_ta : obj.title_en}
                  </span>
                </div>
                <h3 className="font-tamil-serif font-bold text-lg text-[#19231D] mb-2">
                  {language === 'ta' ? obj.title_ta : obj.title_en}
                </h3>
                <p className="text-xs text-[#5C5044] leading-relaxed">
                  {language === 'ta' ? obj.desc_ta : obj.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Advisory Board */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C85A32]">
              {t('வழிகாட்டும் அறிஞர்கள்', 'Scholarly Guidance')}
            </span>
            <h2 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-[#132B20] mt-1">
              {t('கல்வி மற்றும் மருத்துவ ஆலோசகர்கள்', 'Academic Advisory Board')}
            </h2>
            <p className="text-xs text-[#786E63] font-serif italic mt-1">
              {t('பாடத்திட்டம் மற்றும் கலைச்சொல்லாக்கத்தை மேற்பார்வையிடும் மருத்துவப் பேராசிரியர்கள்', 'Professors and linguists overseeing textbook peer reviews')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisoryMembers.map((member, i) => (
              <div key={i} className="p-6 bg-white border border-[#E5DCD0] rounded-sm shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#132B20] text-white flex items-center justify-center font-serif text-lg font-bold mb-4">
                    {member.name_en.charAt(0)}
                  </div>
                  <h3 className="font-tamil-sans font-bold text-base text-[#19231D] mb-1">
                    {language === 'ta' ? member.name_ta : member.name_en}
                  </h3>
                  <p className="text-xs text-[#C85A32] font-semibold mb-3">
                    {language === 'ta' ? member.role_ta : member.role_en}
                  </p>
                  <p className="text-xs text-[#5C5044] leading-relaxed">
                    {language === 'ta' ? member.bio_ta : member.bio_en}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-[#F2ECE3] flex items-center gap-1.5 text-[11px] text-[#786E63]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('சரிபார்க்கப்பட்ட கல்வி ஆலோசகர்', 'Verified Board Advisor')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration & Legal Verification */}
        <div className="p-8 bg-[#132B20] text-white rounded-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E5A086] font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{t('அங்கீகரிக்கப்பட்ட கல்வி அறக்கட்டளை', 'Registered Educational Trust')}</span>
              </div>
              <h3 className="font-tamil-serif font-bold text-xl text-white">
                {t(settings.trust_name_ta, settings.trust_name_en)}
              </h3>
              <p className="text-xs text-[#A6B8AC] mt-1">
                {t('அரசு பதிவு எண்:', 'Govt Registration Number:')} {settings.registration_number}
              </p>
            </div>

            <button
              onClick={() => onNavigate('/contact')}
              className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs font-semibold rounded-sm transition-colors whitespace-nowrap"
            >
              {t('அறக்கட்டளையைத் தொடர்பு கொள்க', 'Connect with the Trust')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
