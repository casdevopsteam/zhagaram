import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings, addContactSubmission } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage(t('தயவுசெய்து அனைத்து புலங்களையும் நிரப்பவும்.', 'Please fill out all required fields.'));
      return;
    }

    if (!consent) {
      setStatus('error');
      setErrorMessage(
        t('தொடர்பு கொள்ள உங்கள் ஒப்புதலைத் தேர்வு செய்யவும்.', 'Please acknowledge the privacy consent checkbox.')
      );
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      const ok = addContactSubmission({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      if (ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setConsent(false);
      } else {
        setStatus('error');
        setErrorMessage(t('செய்தியை அனுப்புவதில் பிழை ஏற்பட்டது.', 'Failed to submit inquiry.'));
      }
    }, 400);
  };

  return (
    <div className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#C85A32]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
              {t('தொடர்பு & ஆலோசனை', 'Contact & Inquiries')}
            </span>
            <span className="w-6 h-px bg-[#C85A32]" />
          </div>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#132B20] leading-tight">
            {t('ழகரம் அறக்கட்டளையைத் தொடர்பு கொள்க', 'Connect with Zhagaram Trust')}
          </h1>

          <p className="text-sm md:text-base text-[#5C5044] font-tamil-sans mt-3 leading-relaxed">
            {t(
              'மருத்துவக் கல்வி நூல்கள், கலைச்சொல்லாக்க ஆய்வுக் கூட்டுறவு அல்லது கல்விப் பயிலரங்குகள் குறித்த உங்கள் ஆலோசனைகளை எங்களுக்கு அனுப்புங்கள்.',
              'Submit academic inquiries, collaboration proposals for medical lexicography, or orders for published educational textbooks.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Verified Contact Info Card */}
          <div className="lg:col-span-5 bg-[#132B20] text-white p-8 md:p-10 rounded-sm shadow-md">
            <h3 className="font-tamil-serif text-2xl font-bold text-white mb-2">
              {t(settings.trust_name_ta, settings.trust_name_en)}
            </h3>
            <p className="text-xs text-[#A6B8AC] leading-relaxed mb-8">
              {t(
                'தாய்மொழியில் மருத்துவக் கல்வியை எளிமையாக்கும் கல்விப்பணி மற்றும் அறிவியல் வெளியீட்டு தளம்.',
                'Dedicated to publishing undergraduate medical textbooks and advancing standardized Tamil clinical terminology.'
              )}
            </p>

            <div className="space-y-6 text-xs text-[#C5D9CD]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A6B8AC] block mb-0.5">
                    {t('அலுவலக முகவரி', 'Registered Office')}
                  </span>
                  <span className="leading-relaxed text-white">
                    {t(settings.address_ta, settings.address_en)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A6B8AC] block mb-0.5">
                    {t('தொலைபேசி', 'Telephone')}
                  </span>
                  <span className="text-white font-mono">{settings.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A6B8AC] block mb-0.5">
                    {t('மின்னஞ்சல்', 'Official Email')}
                  </span>
                  <a href={`mailto:${settings.email}`} className="text-white hover:underline">
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#234233] text-[11px] text-[#86998C]">
              <p>{t('பதிவு எண்:', 'Reg No:')} {settings.registration_number}</p>
              <p className="mt-1">{t('வேலை நேரம்: திங்கள் - சனி, காலை 9:30 - மாலை 5:30', 'Working Hours: Mon - Sat, 9:30 AM - 5:30 PM')}</p>
            </div>
          </div>

          {/* Right Column: Accessible Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#E5DCD0] rounded-sm p-8 md:p-10 shadow-xs">
            <h3 className="font-tamil-serif text-xl font-bold text-[#132B20] mb-6">
              {t('செய்தி அல்லது ஆலோசனையை அனுப்பவும்', 'Send an Inquiry or Message')}
            </h3>

            {status === 'success' && (
              <div className="p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-sm flex items-start gap-3 text-emerald-800 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    {t('உங்கள் செய்தி வெற்றிகரமாகப் பெறப்பட்டது!', 'Your message has been received successfully!')}
                  </p>
                  <p className="mt-0.5">
                    {t(
                      'அறக்கட்டளையின் நிர்வாகக் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்.',
                      'Our administrative team will review your message and respond promptly.'
                    )}
                  </p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3 text-red-800 text-xs">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p>{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#19231D] mb-1">
                    {t('உங்கள் பெயர்', 'Your Full Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t('எ.கா. மரு. க. கார்த்திக்', 'e.g. Dr. K. Karthik')}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD3C7] rounded-sm text-xs md:text-sm text-[#19231D] focus:outline-hidden focus:border-[#C85A32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#19231D] mb-1">
                    {t('மின்னஞ்சல் முகவரி', 'Email Address')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD3C7] rounded-sm text-xs md:text-sm text-[#19231D] focus:outline-hidden focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#19231D] mb-1">
                  {t('செய்தியின் பொருள்', 'Subject / Topic')} *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder={t('எ.கா. உடற்கூறியல் நூல் பெறுதல் / கலைச்சொல் ஆலோசனை', 'e.g. Medical book order / Terminology suggestion')}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD3C7] rounded-sm text-xs md:text-sm text-[#19231D] focus:outline-hidden focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#19231D] mb-1">
                  {t('செய்தி விளக்கம்', 'Your Message')} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={t('உங்கள் கேள்விகள் அல்லது கருத்துக்களை விரிவாக எழுதவும்...', 'Provide detailed notes regarding your inquiry or suggestion...')}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD3C7] rounded-sm text-xs md:text-sm text-[#19231D] focus:outline-hidden focus:border-[#C85A32]"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consent-check"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="mt-1 accent-[#C85A32]"
                />
                <label htmlFor="consent-check" className="text-xs text-[#5C5044] leading-relaxed cursor-pointer">
                  {t(
                    'எனது தகவல்கள் அறக்கட்டளையின் தொடர்பு நோக்கத்திற்காகப் பயன்படுத்தப்படுவதை ஒப்புக்கொள்கிறேன்.',
                    'I consent to having Zhagaram Trust process my contact details solely for responding to this inquiry.'
                  )}
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-6 py-3 bg-[#C85A32] hover:bg-[#B54E29] disabled:opacity-50 text-white text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === 'submitting'
                      ? t('அனுப்பப்படுகிறது...', 'Sending Message...')
                      : t('செய்தியை அனுப்பவும்', 'Submit Inquiry')}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
