import React from 'react';

// Specialized SVG and styled vector artwork for Zhagaram Trust resources
// Guarantees zero broken images and instant crisp rendering across high-DPI displays

export const TrustLogo: React.FC<{ size?: number; className?: string; variant?: 'color' | 'light' | 'monochrome' }> = ({
  size = 40,
  className = '',
  variant = 'color',
}) => {
  const isLight = variant === 'light';
  const strokeColor = isLight ? '#FAF8F5' : '#132B20';
  const accentColor = isLight ? '#E5A086' : '#C85A32';
  const circleBg = isLight ? 'rgba(255, 255, 255, 0.08)' : '#F2ECE4';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Zhagaram Trust Logo"
    >
      {/* Outer subtle circular ring */}
      <circle cx="50" cy="50" r="46" fill={circleBg} stroke={strokeColor} strokeWidth="1.5" strokeOpacity="0.3" />
      <circle cx="50" cy="50" r="41" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" />

      {/* Stylized open book at base */}
      <path
        d="M28 72 C36 68 44 68 50 71 C56 68 64 68 72 72 L72 76 C64 72 56 72 50 75 C44 72 36 72 28 76 Z"
        fill={strokeColor}
      />

      {/* Stylized central Tamil letter 'ழ' (Zhagaram) */}
      <g transform="translate(24, 18)">
        <path
          d="M 12 14 H 38 C 42 14 44 17 44 21 V 32 C 44 36 41 38 37 38 H 15 V 42 C 15 45 18 47 22 47 H 42 C 43.5 47 44.5 48 44.5 49.5 C 44.5 51 43.5 52 42 52 H 22 C 14 52 10 47 10 40 V 22 C 10 17 14 14 12 14 Z"
          fill={accentColor}
        />
        {/* Interior loop of ழ */}
        <circle cx="27" cy="26" r="4.5" fill={strokeColor} />
      </g>

      {/* Subtle knowledge star at zenith */}
      <polygon points="50,11 51.5,14.5 55,15 52.5,17.5 53,21 50,19 47,21 47.5,17.5 45,15 48.5,14.5" fill={accentColor} />
    </svg>
  );
};

export const BookCoverGraphic: React.FC<{
  title_ta: string;
  title_en: string;
  author: string;
  colorTheme?: 'green' | 'burgundy' | 'navy' | 'terracotta';
  aspectRatio?: string;
  className?: string;
}> = ({ title_ta, title_en, author, colorTheme = 'green', className = '' }) => {
  const themes = {
    green: {
      bg: 'from-[#132B20] to-[#0A1A12]',
      border: 'border-[#2D5A43]',
      accent: '#D4AF37',
      ribbon: '#C85A32',
    },
    burgundy: {
      bg: 'from-[#3A141A] to-[#1E090D]',
      border: 'border-[#632932]',
      accent: '#E6C687',
      ribbon: '#9A3412',
    },
    navy: {
      bg: 'from-[#112233] to-[#0A141E]',
      border: 'border-[#24425F]',
      accent: '#E0C068',
      ribbon: '#C85A32',
    },
    terracotta: {
      bg: 'from-[#4D2316] to-[#2B120B]',
      border: 'border-[#7D3B26]',
      accent: '#F3D295',
      ribbon: '#132B20',
    },
  };

  const theme = themes[colorTheme] || themes.green;

  return (
    <div
      className={`relative w-full aspect-[3/4] bg-gradient-to-b ${theme.bg} rounded-sm p-4 md:p-6 flex flex-col justify-between overflow-hidden shadow-md border-r-2 border-b-2 border-black/30 ${className}`}
    >
      {/* Book spine lighting overlay */}
      <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-white/20 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-3 w-px bg-white/10" />

      {/* Decorative frame line */}
      <div className={`absolute inset-2 border ${theme.border} pointer-events-none rounded-[1px]`} />
      <div className="absolute inset-3 border border-white/5 pointer-events-none" />

      {/* Header crest */}
      <div className="relative z-10 flex items-center justify-between text-[10px] tracking-widest uppercase text-white/60">
        <span className="font-sans">ZHAGARAM TRUST</span>
        <span className="font-serif italic text-amber-200/80">MBBS IN TAMIL</span>
      </div>

      {/* Book Centerpiece */}
      <div className="relative z-10 my-auto text-center px-1">
        <div className="inline-block mx-auto mb-3 w-9 h-9 rounded-full border border-amber-300/40 flex items-center justify-center">
          <span className="text-amber-300 text-sm font-serif">ழ</span>
        </div>
        <h3 className="font-tamil-serif text-lg md:text-xl font-bold text-white tracking-wide leading-tight mb-2">
          {title_ta}
        </h3>
        <p className="font-serif italic text-xs md:text-sm text-stone-300 line-clamp-2">
          {title_en}
        </p>
      </div>

      {/* Author and footer */}
      <div className="relative z-10 pt-3 border-t border-white/10 text-center">
        <p className="text-[11px] text-stone-300 font-sans tracking-wide">
          {author}
        </p>
        <p className="text-[9px] text-amber-200/60 uppercase tracking-widest mt-0.5">
          Medical Education Series
        </p>
      </div>
    </div>
  );
};

export const DocumentCoverGraphic: React.FC<{
  title_ta: string;
  format?: string;
  pages?: number;
  category?: string;
  className?: string;
}> = ({ title_ta, format = 'PDF', pages = 24, category = 'Medical Education', className = '' }) => {
  return (
    <div
      className={`relative w-full aspect-[4/3] bg-[#F7F3EE] border border-[#E2D8CC] rounded-sm p-4 flex flex-col justify-between overflow-hidden shadow-xs hover:border-[#C85A32]/40 transition-colors ${className}`}
    >
      {/* Top corner document fold simulation */}
      <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-[#E2D8CC] to-[#D5C9BB] border-b border-l border-[#C5B7A6]" />

      <div className="flex items-center justify-between text-[11px] text-[#716558] font-sans">
        <span className="font-semibold tracking-wider text-[#C85A32]">{format} DOCUMENT</span>
        <span className="text-[10px]">{pages} Pages</span>
      </div>

      <div className="my-2">
        <div className="w-6 h-1 bg-[#C85A32] mb-2" />
        <h4 className="font-tamil-sans font-bold text-sm text-[#19231D] leading-snug line-clamp-2">
          {title_ta}
        </h4>
        <p className="text-[11px] text-[#786E63] mt-1 font-serif italic">
          {category}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#EAE2D8] text-[10px] text-[#8C8074]">
        <span>ழகரம் ஆவணக் காப்பகம்</span>
        <span className="underline decoration-dotted">சரிபார்க்கப்பட்டது (Verified)</span>
      </div>
    </div>
  );
};

export const LecturePhotoGraphic: React.FC<{
  title: string;
  location?: string;
  theme?: string;
  className?: string;
}> = ({ title, location = 'சென்னை', className = '' }) => {
  return (
    <div
      className={`relative w-full aspect-[16/9] bg-[#1B2921] rounded-sm overflow-hidden flex flex-col justify-between p-4 md:p-6 text-white ${className}`}
    >
      {/* Editorial backdrop with architectural lecture silhouettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />

      {/* Vector simulation of lecture hall & projection */}
      <div className="absolute inset-0 opacity-25">
        <svg width="100%" height="100%" viewBox="0 0 400 225" fill="none" preserveAspectRatio="none">
          <rect x="30" y="20" width="160" height="90" stroke="#FAF8F5" strokeWidth="1.5" />
          <path d="M 50 65 C 70 30 110 30 130 65" stroke="#C85A32" strokeWidth="2" fill="none" />
          <circle cx="110" cy="50" r="14" stroke="#FAF8F5" strokeWidth="1" />
          {/* Seating tiers */}
          <path d="M0 180 Q 200 160 400 180" stroke="#FAF8F5" strokeWidth="1" />
          <path d="M0 200 Q 200 180 400 200" stroke="#FAF8F5" strokeWidth="1" />
          <path d="M0 220 Q 200 200 400 220" stroke="#FAF8F5" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-20 flex justify-between items-center text-xs text-stone-300">
        <span className="font-serif italic text-amber-300/90 tracking-wider">ZHAGARAM EDUCATION FORUM</span>
        <span className="text-[11px] bg-black/40 px-2 py-0.5 border border-white/10 rounded-sm">{location}</span>
      </div>

      <div className="relative z-20 max-w-md">
        <h4 className="font-tamil-serif text-lg md:text-xl font-bold leading-tight text-white mb-1">
          {title}
        </h4>
        <p className="text-xs text-stone-300 line-clamp-1 font-serif italic">
          மருத்துவக் கல்லூரி பேராசிரியர்கள் மற்றும் மாணவ-மாணவிகள் கலந்துரையாடல்
        </p>
      </div>
    </div>
  );
};
