import React from 'react';
import { Mail, Phone, MapPin, Youtube, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { TrustLogo } from './VisualAsset';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { settings } = useData();

  return (
    <footer className="bg-[#132B20] text-[#E0D8CE] border-t border-[#234233] mt-24">
      {/* Upper editorial banner */}
      <div className="border-b border-[#234233]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="text-[11px] font-sans uppercase tracking-widest text-[#E5A086]">
                {t('அறக்கட்டளையின் நோக்கம்', 'Trust Foundation Motto')}
              </span>
              <h3 className="font-tamil-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight">
                {t(settings.motto_ta, settings.motto_en)}
              </h3>
              <p className="font-serif italic text-sm md:text-base text-[#B3C4B8] mt-2 max-w-2xl">
                {t(
                  'மருத்துவம், அறிவியல் மற்றும் உயர்கல்வி அறிவைத் தமிழில் அனைவருக்கும் கொண்டு சேர்ப்பதே எங்களின் பிரதான இலக்கு.',
                  'Making medical, scientific, and educational knowledge accessible through the richness of the Tamil language.'
                )}
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <a
                href={settings.youtube_playlist_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs md:text-sm font-semibold rounded-sm transition-colors shadow-sm"
              >
                <Youtube className="w-4 h-4" />
                <span>{t('MBBS தமிழ் காணொளிகள்', 'MBBS in Tamil Playlist')}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation & details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Trust brand & reg */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <TrustLogo size={36} variant="light" />
              <div>
                <h4 className="font-tamil-serif font-bold text-lg text-white">
                  {t(settings.trust_name_ta, settings.trust_name_en)}
                </h4>
                <p className="text-[10px] text-[#A6B8AC] tracking-wider uppercase">
                  {t('அறக்கட்டளை', 'Educational Trust')}
                </p>
              </div>
            </div>
            <p className="text-xs text-[#A6B8AC] leading-relaxed mb-4">
              {t(
                'தாய்மொழியில் மருத்துவக் கல்வியை எளிமையாக்கும் கல்விப்பணி மற்றும் அறிவியல் வெளியீட்டு தளம்.',
                'A dedicated forum for advancing medical education, authoritative dictionaries, and scholarly publications in Tamil.'
              )}
            </p>
            <div className="text-[11px] text-[#8EA295] space-y-1">
              <p>{t('பதிவு எண்:', 'Reg No:')} {settings.registration_number}</p>
              <p className="flex items-center gap-1 text-[#C85A32]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('அங்கீகரிக்கப்பட்ட தொண்டு அறக்கட்டளை', 'Registered Educational Trust')}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Resource Libraries */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t('கல்விக் களஞ்சியம்', 'Resource Libraries')}
            </h5>
            <ul className="space-y-2.5 text-xs text-[#C5D4C9]">
              <li>
                <button
                  onClick={() => onNavigate('/publications')}
                  className="hover:text-white transition-colors"
                >
                  {t('நூல்கள் மற்றும் வெளியீடுகள்', 'Books & Publications')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/documents')}
                  className="hover:text-white transition-colors"
                >
                  {t('PDF & பாடத்திட்ட ஆவணங்கள்', 'PDFs & Documents')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/videos')}
                  className="hover:text-white transition-colors"
                >
                  {t('MBBS காணொளி விரிவுரைகள்', 'MBBS Video Lectures')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/images')}
                  className="hover:text-white transition-colors"
                >
                  {t('நிகழ்வுப் படத்தொகுப்பு', 'Photo Gallery & Archives')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/events')}
                  className="hover:text-white transition-colors"
                >
                  {t('கருத்தரங்குகள் & பயிலரங்குகள்', 'Conferences & Workshops')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Organization */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t('அமைப்பைப் பற்றி', 'About & Legal')}
            </h5>
            <ul className="space-y-2.5 text-xs text-[#C5D4C9]">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  {t('அறக்கட்டளை வரலாறு & நோக்கங்கள்', 'Our Vision & Objectives')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors"
                >
                  {t('தொடர்பு & ஆலோசனைகள்', 'Contact & Inquiries')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/admin')}
                  className="hover:text-[#E5A086] transition-colors"
                >
                  {t('நிர்வாகப் பகுதி (Admin Portal)', 'Administrator CMS')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Info */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t('முகவரி & தொடர்பு', 'Contact Details')}
            </h5>
            <div className="space-y-3 text-xs text-[#B8C8BD]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {t(settings.address_ta, settings.address_en)}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C85A32] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:underline">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright hairline */}
        <div className="mt-12 pt-6 border-t border-[#234233] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86998C] gap-3">
          <p>
            © {new Date().getFullYear()} {t(settings.trust_name_ta, settings.trust_name_en)}. {t('அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.', 'All rights reserved.')}
          </p>
          <div className="flex items-center gap-4">
            <span>{t('தமிழ்-முதல் கல்வி தளம்', 'Tamil-First Knowledge Initiative')}</span>
            <span>·</span>
            <button
              onClick={() => onNavigate('/admin')}
              className="text-[#B3C4B8] hover:text-white transition-colors"
            >
              {t('நிர்வாக உள்நுழைவு', 'Admin Access')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
