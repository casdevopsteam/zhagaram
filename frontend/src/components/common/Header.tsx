import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { route: '/', label_ta: 'முகப்பு', label_en: 'Home' },
    { route: '/about', label_ta: 'எங்களைப் பற்றி', label_en: 'About' },
    { route: '/publications', label_ta: 'நூல்கள்', label_en: 'Publications' },
    { route: '/documents', label_ta: 'ஆவணங்கள்', label_en: 'Documents' },
    { route: '/videos', label_ta: 'காணொளிகள்', label_en: 'Videos' },
    { route: '/images', label_ta: 'படங்கள்', label_en: 'Gallery' },
    { route: '/events', label_ta: 'நிகழ்வுகள்', label_en: 'Events' },
    { route: '/contact', label_ta: 'தொடர்பு', label_en: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-colors w-full">
      <div className="w-full px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 gap-1.5 sm:gap-4 md:gap-6 w-full">
          
          {/* ZONE 1: Official Brand Logo Lockup */}
          <div className="flex items-center justify-start min-w-0 shrink-0">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center text-left focus:outline-hidden group py-1"
              aria-label="Zhagaram Trust — ழகரம் அறக்கட்டளை"
            >
              <img
                src="/assets/zhagaram-brand-logo.jpg"
                alt="Zhagaram Trust — ழகரம் அறக்கட்டளை"
                className="h-10 sm:h-12 md:h-14 w-auto max-w-[200px] sm:max-w-[260px] md:max-w-[300px] object-contain mix-blend-multiply transition-transform group-hover:scale-[1.02]"
              />
            </button>
          </div>

          {/* ZONE 2: Desktop Navigation Links (Centered, Uses All Available Center Space) */}
          <nav className="hidden xl:flex flex-1 items-center justify-center min-w-0 px-2 lg:px-4">
            <div className="flex items-center gap-1 xl:gap-2 2xl:gap-3 text-xs xl:text-xs 2xl:text-sm font-medium text-[#4A4036]">
              {navLinks.map(link => {
                const isActive = currentRoute === link.route;
                return (
                  <button
                    key={link.route}
                    onClick={() => onNavigate(link.route)}
                    className={`relative py-1.5 px-2 xl:px-2.5 2xl:px-3 transition-colors whitespace-nowrap shrink-0 hover:text-[#132B20] ${
                      isActive ? 'text-[#C85A32] font-semibold' : ''
                    }`}
                  >
                    {language === 'ta' ? link.label_ta : link.label_en}
                    {isActive && (
                      <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#C85A32] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* ZONE 3: Utility Controls (Anchored Right, Compact on Mobile) */}
          <div className="flex items-center justify-end shrink-0 gap-1 sm:gap-2 ml-auto">
            {/* Search Icon Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1 sm:p-1.5 text-[#4A4036] hover:text-[#132B20] hover:bg-[#EFE7DE] rounded-sm transition-colors shrink-0"
              aria-label={t('தேடல்', 'Search')}
              title={t('வளங்களைத் தேடுக', 'Search resources')}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switch Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 border border-[#D5C9BD] hover:border-[#C85A32] rounded-sm text-[11px] sm:text-xs font-semibold text-[#132B20] bg-white/80 hover:bg-white transition-all whitespace-nowrap shadow-2xs shrink-0"
              aria-label="Toggle Tamil and English"
              title={language === 'ta' ? 'Switch to English' : 'தமிழுக்கு மாறவும்'}
            >
              <span className={language === 'ta' ? 'text-[#C85A32] font-bold' : 'text-[#786E63]'}>தமிழ்</span>
              <span className="mx-0.5 text-[#A89C8E]">/</span>
              <span className={language === 'en' ? 'text-[#C85A32] font-bold' : 'text-[#786E63]'}>EN</span>
            </button>

            {/* Three Navigation Bar (Hamburger Menu ☰) - Always visible on mobile/tablet */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="xl:hidden p-1 sm:p-1.5 text-[#132B20] hover:text-[#C85A32] hover:bg-[#EFE7DE] rounded-sm shrink-0 transition-colors"
              aria-label="Toggle navigation menu"
              title="பட்டி (Menu)"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C85A32]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-[#E8DFD5] bg-[#FAF8F5] max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-1">
              {navLinks.map(link => {
                const isActive = currentRoute === link.route;
                return (
                  <button
                    key={link.route}
                    onClick={() => {
                      onNavigate(link.route);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 text-sm rounded-sm transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#EFE7DE] text-[#C85A32] font-semibold'
                        : 'text-[#4A4036] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    <span>{language === 'ta' ? link.label_ta : link.label_en}</span>
                    <span className="text-[11px] text-[#8C8074] font-serif italic">
                      {language === 'ta' ? link.label_en : link.label_ta}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
