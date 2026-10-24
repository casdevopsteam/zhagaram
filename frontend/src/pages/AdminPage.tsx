import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  EyeOff,
  Upload,
  BookOpen,
  FileText,
  Video,
  Image as ImageIcon,
  Calendar,
  Settings,
  Mail,
  Download,
  RefreshCw,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ContentType, DocumentItem, EventItem, ImageItem, PublicationItem, VideoItem } from '../types';

export const AdminPage: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    publications,
    documents,
    videos,
    images,
    events,
    settings,
    contactSubmissions,
    addPublication,
    updatePublication,
    deletePublication,
    addDocument,
    updateDocument,
    deleteDocument,
    addVideo,
    updateVideo,
    deleteVideo,
    addImage,
    updateImage,
    deleteImage,
    addEvent,
    updateEvent,
    deleteEvent,
    updateSettings,
    markSubmissionRead,
    deleteSubmission,
    togglePublishStatus,
    resetToDefaults,
    exportDataJson,
    importDataJson,
  } = useData();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('zhagaram_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'publications' | 'documents' | 'videos' | 'images' | 'events' | 'contacts' | 'settings'
  >('publications');

  // Success notifications
  const [notice, setNotice] = useState<string | null>(null);
  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  // Forms modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    title_ta: '',
    title_en: '',
    description_ta: '',
    description_en: '',
    category: 'மருத்துவக் கல்வி',
    category_en: 'Medical Education',
    author_ta: '',
    author_en: '',
    isbn: '',
    price_inr: 500,
    is_free_download: false,
    file_name: '',
    file_size: '2.5 MB',
    format: 'PDF',
    page_count: 20,
    youtube_id: '',
    playlist_id: '',
    duration: '35:00',
    lecturer_ta: '',
    lecturer_en: '',
    caption_ta: '',
    caption_en: '',
    credit: 'ழகரம் ஆவணக் காப்பகம்',
    date: '2026-12-10',
    time: 'காலை 10:00 - மாலை 04:00',
    venue_ta: 'சென்னை',
    venue_en: 'Chennai',
    is_upcoming: true,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo passcode is "zhagaram2026" or "admin"
    if (passwordInput === 'zhagaram2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('zhagaram_admin_auth', 'true');
      setLoginError('');
      showNotice(t('வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள்.', 'Signed in as Administrator.'));
    } else {
      setLoginError(t('தவறான கடவுச்சொல். (சோதனைக்கு: zhagaram2026)', 'Invalid passcode. (Demo passcode: zhagaram2026)'));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('zhagaram_admin_auth');
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title_ta: '',
      title_en: '',
      description_ta: '',
      description_en: '',
      category: 'மருத்துவக் கல்வி',
      category_en: 'Medical Education',
      author_ta: '',
      author_en: '',
      isbn: '',
      price_inr: 500,
      is_free_download: false,
      file_name: '',
      file_size: '2.5 MB',
      format: 'PDF',
      page_count: 20,
      youtube_id: '',
      playlist_id: '',
      duration: '35:00',
      lecturer_ta: '',
      lecturer_en: '',
      caption_ta: '',
      caption_en: '',
      credit: 'ழகரம் ஆவணக் காப்பகம்',
      date: '2026-12-10',
      time: 'காலை 10:00 - மாலை 04:00',
      venue_ta: 'சென்னை',
      venue_en: 'Chennai',
      is_upcoming: true,
    });
    setEditingItem(null);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title_ta.trim() || !formData.title_en.trim()) {
      alert('Please provide title in both Tamil and English.');
      return;
    }

    if (activeTab === 'publications') {
      if (editingItem) {
        updatePublication(editingItem.id, {
          title_ta: formData.title_ta,
          title_en: formData.title_en,
          description_ta: formData.description_ta,
          description_en: formData.description_en,
          category: formData.category,
          category_en: formData.category_en,
          author_ta: formData.author_ta || 'ழகரம் குழு',
          author_en: formData.author_en || 'Zhagaram Board',
          isbn: formData.isbn,
          price_inr: Number(formData.price_inr),
          is_free_download: formData.is_free_download,
        });
        showNotice(t('நூல் விவரம் புதுப்பிக்கப்பட்டது.', 'Publication updated.'));
      } else {
        addPublication({
          slug: formData.title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          type: 'publication',
          title_ta: formData.title_ta,
          title_en: formData.title_en,
          description_ta: formData.description_ta,
          description_en: formData.description_en,
          category: formData.category,
          category_en: formData.category_en,
          author_ta: formData.author_ta || 'ழகரம் குழு',
          author_en: formData.author_en || 'Zhagaram Board',
          isbn: formData.isbn,
          publication_year: new Date().getFullYear(),
          page_count: Number(formData.page_count) || 200,
          publisher_ta: 'ழகரம் அறக்கட்டளை வெளியீட்டகம்',
          publisher_en: 'Zhagaram Trust Publications',
          price_inr: Number(formData.price_inr),
          is_free_download: formData.is_free_download,
          status: 'published',
          featured: false,
          sort_order: 1,
        });
        showNotice(t('புதிய நூல் சேர்க்கப்பட்டது.', 'New publication added.'));
      }
    } else if (activeTab === 'documents') {
      if (editingItem) {
        updateDocument(editingItem.id, {
          title_ta: formData.title_ta,
          title_en: formData.title_en,
          description_ta: formData.description_ta,
          description_en: formData.description_en,
          category: formData.category,
          category_en: formData.category_en,
          file_name: formData.file_name || 'document.pdf',
        });
        showNotice(t('ஆவணம் புதுப்பிக்கப்பட்டது.', 'Document updated.'));
      } else {
        addDocument({
          slug: formData.title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          type: 'document',
          title_ta: formData.title_ta,
          title_en: formData.title_en,
          description_ta: formData.description_ta,
          description_en: formData.description_en,
          category: formData.category,
          category_en: formData.category_en,
          file_url: `/documents/${formData.file_name || 'doc.pdf'}`,
          file_name: formData.file_name || 'tamil_academic_document.pdf',
          file_size: formData.file_size || '2.0 MB',
          format: 'PDF',
          page_count: Number(formData.page_count) || 24,
          author_or_source_ta: 'ழகரம் ஆய்வுக் குழு',
          author_or_source_en: 'Zhagaram Research Cell',
          publication_year: new Date().getFullYear(),
          is_downloadable: true,
          status: 'published',
          featured: false,
          sort_order: 1,
        });
        showNotice(t('புதிய ஆவணம் சேர்க்கப்பட்டது.', 'New document added.'));
      }
    } else if (activeTab === 'videos') {
      if (editingItem) {
        updateVideo(editingItem.id, {
          title_ta: formData.title_ta,
          title_en: formData.title_en,
          description_ta: formData.description_ta,
          description_en: formData.description_en,
          youtube_id: formData.youtube_id || 'PLqAGZgQ8AD2sxSFrSfhbHKMOjjxZ6CrHG',
          lecturer_ta: formData.lecturer_ta,
          lecturer_en: formData.lecturer_en,
        });
        showNotice(t('காணொளி விவரம் புதுப்பிக்கப்பட்டது.', 'Video updated.'));
      } else {
        addVideo({
          slug: formData.title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          type: 'video',
          title_ta: formData.title_ta,
          title_en: formData.title_en,
          description_ta: formData.description_ta,
          description_en: formData.description_en,
          category: formData.category,
          category_en: formData.category_en,
          provider: 'youtube',
          youtube_id: formData.youtube_id || 'PLqAGZgQ8AD2sxSFrSfhbHKMOjjxZ6CrHG',
          playlist_id: formData.playlist_id || 'PLqAGZgQ8AD2sxSFrSfhbHKMOjjxZ6CrHG',
          duration: formData.duration || '40:00',
          lecturer_ta: formData.lecturer_ta || 'மருத்துவக் குழு',
          lecturer_en: formData.lecturer_en || 'Faculty Board',
          status: 'published',
          featured: false,
          sort_order: 1,
        });
        showNotice(t('புதிய காணொளி சேர்க்கப்பட்டது.', 'New video added.'));
      }
    } else if (activeTab === 'images') {
      if (editingItem) {
        updateImage(editingItem.id, {
          title_ta: formData.title_ta,
          title_en: formData.title_en,
          caption_ta: formData.caption_ta,
          caption_en: formData.caption_en,
          credit: formData.credit,
        });
        showNotice(t('படம் புதுப்பிக்கப்பட்டது.', 'Image updated.'));
      } else {
        addImage({
          slug: formData.title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          type: 'image',
          image_url: 'asset_uploaded',
          title_ta: formData.title_ta,
          title_en: formData.title_en,
          description_ta: formData.description_ta,
          description_en: formData.description_en,
          category: formData.category,
          category_en: formData.category_en,
          alt_text_ta: formData.title_ta,
          alt_text_en: formData.title_en,
          caption_ta: formData.caption_ta || formData.description_ta,
          caption_en: formData.caption_en || formData.description_en,
          credit: formData.credit,
          status: 'published',
          featured: false,
          sort_order: 1,
        });
        showNotice(t('புதிய படம் சேர்க்கப்பட்டது.', 'New image uploaded.'));
      }
    } else if (activeTab === 'events') {
      if (editingItem) {
        updateEvent(editingItem.id, {
          title_ta: formData.title_ta,
          title_en: formData.title_en,
          description_ta: formData.description_ta,
          description_en: formData.description_en,
          date: formData.date,
          time: formData.time,
          venue_ta: formData.venue_ta,
          venue_en: formData.venue_en,
          is_upcoming: formData.is_upcoming,
        });
        showNotice(t('நிகழ்வு புதுப்பிக்கப்பட்டது.', 'Event updated.'));
      } else {
        addEvent({
          title_ta: formData.title_ta,
          title_en: formData.title_en,
          description_ta: formData.description_ta,
          description_en: formData.description_en,
          date: formData.date,
          time: formData.time,
          venue_ta: formData.venue_ta,
          venue_en: formData.venue_en,
          is_upcoming: formData.is_upcoming,
          registration_open: true,
          registration_url: 'https://zhagaramtrust.org/register',
          category_ta: formData.category,
          category_en: formData.category_en,
        });
        showNotice(t('புதிய நிகழ்வு உருவாக்கப்பட்டது.', 'New event created.'));
      }
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title_ta: item.title_ta || '',
      title_en: item.title_en || '',
      description_ta: item.description_ta || '',
      description_en: item.description_en || '',
      category: item.category || item.category_ta || 'மருத்துவக் கல்வி',
      category_en: item.category_en || 'Medical Education',
      author_ta: item.author_ta || '',
      author_en: item.author_en || '',
      isbn: item.isbn || '',
      price_inr: item.price_inr || 500,
      is_free_download: !!item.is_free_download,
      file_name: item.file_name || '',
      file_size: item.file_size || '2.5 MB',
      format: item.format || 'PDF',
      page_count: item.page_count || 20,
      youtube_id: item.youtube_id || '',
      playlist_id: item.playlist_id || '',
      duration: item.duration || '35:00',
      lecturer_ta: item.lecturer_ta || '',
      lecturer_en: item.lecturer_en || '',
      caption_ta: item.caption_ta || '',
      caption_en: item.caption_en || '',
      credit: item.credit || 'ழகரம் ஆவணக் காப்பகம்',
      date: item.date || '2026-12-10',
      time: item.time || 'காலை 10:00 - மாலை 04:00',
      venue_ta: item.venue_ta || 'சென்னை',
      venue_en: item.venue_en || 'Chennai',
      is_upcoming: item.is_upcoming !== undefined ? item.is_upcoming : true,
    });
    setShowAddModal(true);
  };

  // If not authenticated, render login gate
  if (!isAuthenticated) {
    return (
      <div className="py-20 md:py-32 bg-[#FAF8F5] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-[#E5DCD0] rounded-sm p-8 md:p-10 shadow-lg">
          <div className="w-12 h-12 bg-[#132B20] text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[#E5A086]" />
          </div>

          <h2 className="font-tamil-serif text-2xl font-bold text-center text-[#132B20] mb-1">
            {t('நிர்வாகி உள்நுழைவு', 'Administrator Access')}
          </h2>

          <p className="text-xs text-center text-[#786E63] font-serif italic mb-6">
            {t('ழகரம் அறக்கட்டளை உள்ளடக்க மேலாண்மை பலகை', 'Zhagaram Trust Content Management System')}
          </p>

          {loginError && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#19231D] mb-1">
                {t('நிர்வாக கடவுச்சொல்', 'Admin Passcode')}
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="zhagaram2026"
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD3C7] rounded-sm text-sm text-[#19231D] focus:outline-hidden focus:border-[#C85A32]"
              />
              <p className="text-[11px] text-[#8C8074] mt-1.5 font-mono">
                {t('சோதனை கடவுச்சொல்: zhagaram2026', 'Demo Access Key: zhagaram2026')}
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs font-semibold rounded-sm transition-colors shadow-xs"
            >
              {t('உள்நுழைக (Sign In)', 'Sign In to CMS')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5DCD0] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#132B20] text-white rounded-sm">
              <Shield className="w-6 h-6 text-[#E5A086]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
                  {t('உள்ளடக்க மேலாண்மை பலகை (CMS)', 'Content Management Portal')}
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-xs">
                  {t('அங்கீகரிக்கப்பட்டது', 'Authorized')}
                </span>
              </div>
              <h1 className="font-tamil-serif text-2xl md:text-3xl font-bold text-[#132B20]">
                {t('ழகரம் அறக்கட்டளை நிர்வாகம்', 'Zhagaram Trust Administrator')}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const json = exportDataJson();
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `zhagaram_data_backup_${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
                showNotice(t('காப்பு பிரதி கோப்பு பதிவிறக்கப்பட்டது.', 'Data backup JSON exported.'));
              }}
              className="px-3 py-1.5 border border-[#DDD3C7] bg-white hover:bg-[#F2ECE3] text-xs font-semibold text-[#5C5044] rounded-sm transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('JSON காப்பு பிரதி', 'Export Data')}</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#EFE7DE] border border-[#DDD3C7] text-xs font-semibold text-[#786E63] rounded-sm transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('வெளியேறு', 'Sign Out')}</span>
            </button>
          </div>
        </div>

        {/* Global Toast Notice */}
        {notice && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-6 border-b border-[#E5DCD0]">
          {[
            { id: 'publications', label_ta: 'நூல்கள்', label_en: 'Books', icon: BookOpen, count: publications.length },
            { id: 'documents', label_ta: 'ஆவணங்கள்', label_en: 'PDFs & Docs', icon: FileText, count: documents.length },
            { id: 'videos', label_ta: 'காணொளிகள்', label_en: 'Videos', icon: Video, count: videos.length },
            { id: 'images', label_ta: 'படங்கள்', label_en: 'Photos', icon: ImageIcon, count: images.length },
            { id: 'events', label_ta: 'நிகழ்வுகள்', label_en: 'Events', icon: Calendar, count: events.length },
            { id: 'contacts', label_ta: 'மின்னஞ்சல்கள்', label_en: 'Inquiries', icon: Mail, count: contactSubmissions.length },
            { id: 'settings', label_ta: 'அமைப்புகள்', label_en: 'Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#132B20] text-white shadow-2xs'
                    : 'bg-white border border-[#DDD3C7] text-[#5C5044] hover:bg-[#F2ECE3]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? tab.label_ta : tab.label_en}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-xs text-[10px] font-mono ${isActive ? 'bg-white/20' : 'bg-stone-100 text-stone-600'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Header for Current Resource Tab */}
        {activeTab !== 'contacts' && activeTab !== 'settings' && (
          <div className="flex items-center justify-between mb-6 bg-white p-4 border border-[#E5DCD0] rounded-sm">
            <div>
              <h2 className="font-tamil-sans font-bold text-base text-[#132B20]">
                {activeTab === 'publications' && t('நூல்கள் மற்றும் வெளியீடுகள் மேலாண்மை', 'Manage Publications')}
                {activeTab === 'documents' && t('PDF & பாடத்திட்ட ஆவணங்கள் மேலாண்மை', 'Manage Documents & PDFs')}
                {activeTab === 'videos' && t('MBBS காணொளிகள் & விரிவுரைகள் மேலாண்மை', 'Manage Video Lectures')}
                {activeTab === 'images' && t('படத்தொகுப்பு ஆவணங்கள் மேலாண்மை', 'Manage Photo Gallery')}
                {activeTab === 'events' && t('நிகழ்வுகள் மற்றும் பயிலரங்குகள் மேலாண்மை', 'Manage Events & Symposia')}
              </h2>
              <p className="text-xs text-[#786E63]">
                {t('புதிய உள்ளடக்கத்தைச் சேர்க்கவும், திருத்தவும் அல்லது வெளியிடவும்.', 'Add new items, edit metadata, or toggle publish states.')}
              </p>
            </div>

            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="px-4 py-2 bg-[#C85A32] hover:bg-[#B54E29] text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t('புதிய வளத்தைச் சேர்க்க', 'Add New Item')}</span>
            </button>
          </div>
        )}

        {/* TAB 1: Publications */}
        {activeTab === 'publications' && (
          <div className="bg-white border border-[#E5DCD0] rounded-sm overflow-hidden shadow-2xs">
            <div className="divide-y divide-[#EFE7DE]">
              {publications.map(pub => (
                <div key={pub.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#786E63] mb-1">
                      <span className="font-semibold text-[#C85A32] uppercase">{pub.category}</span>
                      <span>·</span>
                      <span>{pub.publication_year}</span>
                      <span>·</span>
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase ${
                        pub.status === 'published' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {pub.status}
                      </span>
                    </div>
                    <h3 className="font-tamil-sans font-bold text-base text-[#19231D]">
                      {pub.title_ta}
                    </h3>
                    <p className="text-xs text-[#786E63] font-serif italic mb-1">{pub.title_en}</p>
                    <p className="text-xs text-[#5C5044] line-clamp-1">{pub.description_ta}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePublishStatus('publication', pub.id)}
                      className="p-1.5 border border-[#DDD3C7] rounded-sm hover:bg-[#EAE2D8] text-xs flex items-center gap-1 text-[#5C5044]"
                      title="Toggle Publish / Draft"
                    >
                      {pub.status === 'published' ? <Eye className="w-3.5 h-3.5 text-emerald-700" /> : <EyeOff className="w-3.5 h-3.5 text-amber-700" />}
                    </button>
                    <button
                      onClick={() => handleEdit(pub)}
                      className="p-1.5 border border-[#DDD3C7] rounded-sm hover:bg-[#EAE2D8] text-xs flex items-center gap-1 text-[#132B20]"
                      title="Edit Publication"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this publication?')) {
                          deletePublication(pub.id);
                          showNotice(t('நூல் நீக்கப்பட்டது.', 'Publication deleted.'));
                        }
                      }}
                      className="p-1.5 border border-red-200 rounded-sm hover:bg-red-50 text-xs text-red-600"
                      title="Delete Publication"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Documents */}
        {activeTab === 'documents' && (
          <div className="bg-white border border-[#E5DCD0] rounded-sm overflow-hidden shadow-2xs">
            <div className="divide-y divide-[#EFE7DE]">
              {documents.map(doc => (
                <div key={doc.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#786E63] mb-1">
                      <span className="font-semibold text-[#1E4D38] uppercase">{doc.format}</span>
                      <span>·</span>
                      <span>{doc.file_size}</span>
                      <span>·</span>
                      <span>{doc.page_count} {t('பக்கங்கள்', 'Pages')}</span>
                      <span>·</span>
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase ${
                        doc.status === 'published' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                    <h3 className="font-tamil-sans font-bold text-base text-[#19231D]">
                      {doc.title_ta}
                    </h3>
                    <p className="text-xs text-[#786E63] font-serif italic mb-1">{doc.title_en}</p>
                    <p className="text-xs text-[#5C5044] line-clamp-1">{doc.description_ta}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePublishStatus('document', doc.id)}
                      className="p-1.5 border border-[#DDD3C7] rounded-sm hover:bg-[#EAE2D8] text-xs"
                      title="Toggle Publish / Draft"
                    >
                      {doc.status === 'published' ? <Eye className="w-3.5 h-3.5 text-emerald-700" /> : <EyeOff className="w-3.5 h-3.5 text-amber-700" />}
                    </button>
                    <button
                      onClick={() => handleEdit(doc)}
                      className="p-1.5 border border-[#DDD3C7] rounded-sm hover:bg-[#EAE2D8] text-xs text-[#132B20]"
                      title="Edit Document"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this document?')) {
                          deleteDocument(doc.id);
                          showNotice(t('ஆவணம் நீக்கப்பட்டது.', 'Document deleted.'));
                        }
                      }}
                      className="p-1.5 border border-red-200 rounded-sm hover:bg-red-50 text-xs text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Videos */}
        {activeTab === 'videos' && (
          <div className="bg-white border border-[#E5DCD0] rounded-sm overflow-hidden shadow-2xs">
            <div className="divide-y divide-[#EFE7DE]">
              {videos.map(vid => (
                <div key={vid.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#786E63] mb-1">
                      <span className="font-semibold text-red-700 uppercase">YouTube</span>
                      <span>·</span>
                      <span>{vid.duration}</span>
                      <span>·</span>
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase ${
                        vid.status === 'published' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {vid.status}
                      </span>
                    </div>
                    <h3 className="font-tamil-sans font-bold text-base text-[#19231D]">
                      {vid.title_ta}
                    </h3>
                    <p className="text-xs text-[#786E63] font-serif italic mb-1">{vid.title_en}</p>
                    <p className="text-xs text-[#5C5044]">{vid.lecturer_ta}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePublishStatus('video', vid.id)}
                      className="p-1.5 border border-[#DDD3C7] rounded-sm hover:bg-[#EAE2D8] text-xs"
                      title="Toggle Publish / Draft"
                    >
                      {vid.status === 'published' ? <Eye className="w-3.5 h-3.5 text-emerald-700" /> : <EyeOff className="w-3.5 h-3.5 text-amber-700" />}
                    </button>
                    <button
                      onClick={() => handleEdit(vid)}
                      className="p-1.5 border border-[#DDD3C7] rounded-sm hover:bg-[#EAE2D8] text-xs text-[#132B20]"
                      title="Edit Video"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this video?')) {
                          deleteVideo(vid.id);
                          showNotice(t('காணொளி நீக்கப்பட்டது.', 'Video deleted.'));
                        }
                      }}
                      className="p-1.5 border border-red-200 rounded-sm hover:bg-red-50 text-xs text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Images */}
        {activeTab === 'images' && (
          <div className="bg-white border border-[#E5DCD0] rounded-sm overflow-hidden shadow-2xs">
            <div className="divide-y divide-[#EFE7DE]">
              {images.map(img => (
                <div key={img.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#786E63] mb-1">
                      <span className="font-semibold text-[#8C6D46] uppercase">{img.category}</span>
                      <span>·</span>
                      <span>{img.created_at}</span>
                      <span>·</span>
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase ${
                        img.status === 'published' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {img.status}
                      </span>
                    </div>
                    <h3 className="font-tamil-sans font-bold text-base text-[#19231D]">
                      {img.title_ta}
                    </h3>
                    <p className="text-xs text-[#786E63] font-serif italic mb-1">{img.title_en}</p>
                    <p className="text-xs text-[#5C5044] line-clamp-1">{img.caption_ta}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePublishStatus('image', img.id)}
                      className="p-1.5 border border-[#DDD3C7] rounded-sm hover:bg-[#EAE2D8] text-xs"
                      title="Toggle Publish / Draft"
                    >
                      {img.status === 'published' ? <Eye className="w-3.5 h-3.5 text-emerald-700" /> : <EyeOff className="w-3.5 h-3.5 text-amber-700" />}
                    </button>
                    <button
                      onClick={() => handleEdit(img)}
                      className="p-1.5 border border-[#DDD3C7] rounded-sm hover:bg-[#EAE2D8] text-xs text-[#132B20]"
                      title="Edit Image"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this image?')) {
                          deleteImage(img.id);
                          showNotice(t('படம் நீக்கப்பட்டது.', 'Image deleted.'));
                        }
                      }}
                      className="p-1.5 border border-red-200 rounded-sm hover:bg-red-50 text-xs text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Events */}
        {activeTab === 'events' && (
          <div className="bg-white border border-[#E5DCD0] rounded-sm overflow-hidden shadow-2xs">
            <div className="divide-y divide-[#EFE7DE]">
              {events.map(evt => (
                <div key={evt.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#786E63] mb-1">
                      <span className="font-semibold text-[#C85A32] uppercase">{evt.category_ta}</span>
                      <span>·</span>
                      <span>{evt.date}</span>
                      <span>·</span>
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                        evt.is_upcoming ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {evt.is_upcoming ? 'Upcoming' : 'Past'}
                      </span>
                    </div>
                    <h3 className="font-tamil-sans font-bold text-base text-[#19231D]">
                      {evt.title_ta}
                    </h3>
                    <p className="text-xs text-[#786E63] font-serif italic mb-1">{evt.title_en}</p>
                    <p className="text-xs text-[#5C5044]">{evt.venue_ta}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(evt)}
                      className="p-1.5 border border-[#DDD3C7] rounded-sm hover:bg-[#EAE2D8] text-xs text-[#132B20]"
                      title="Edit Event"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this event?')) {
                          deleteEvent(evt.id);
                          showNotice(t('நிகழ்வு நீக்கப்பட்டது.', 'Event deleted.'));
                        }
                      }}
                      className="p-1.5 border border-red-200 rounded-sm hover:bg-red-50 text-xs text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Contact Submissions Inbox */}
        {activeTab === 'contacts' && (
          <div className="bg-white border border-[#E5DCD0] rounded-sm overflow-hidden shadow-2xs">
            <div className="p-4 bg-[#FAF8F5] border-b border-[#E5DCD0] flex justify-between items-center">
              <h3 className="font-tamil-serif font-bold text-base text-[#132B20]">
                {t('பெறப்பட்ட செய்திகள் & ஆலோசனைகள்', 'Inbound Contact Submissions')}
              </h3>
              <span className="text-xs text-[#786E63]">
                {contactSubmissions.length} {t('செய்திகள்', 'messages')}
              </span>
            </div>

            {contactSubmissions.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#786E63]">
                {t('செய்திகள் எதுவும் பெறப்படவில்லை.', 'No contact submissions yet.')}
              </div>
            ) : (
              <div className="divide-y divide-[#EFE7DE]">
                {contactSubmissions.map(msg => (
                  <div key={msg.id} className={`p-4 sm:p-5 ${msg.read ? 'bg-white' : 'bg-amber-50/30'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#19231D]">{msg.name}</span>
                        <span className="text-xs text-[#786E63]">({msg.email})</span>
                      </div>
                      <span className="text-[11px] text-[#8C8074]">{msg.date}</span>
                    </div>

                    <h4 className="text-xs font-semibold text-[#C85A32] mb-1">
                      {t('பொருள்:', 'Subject:')} {msg.subject}
                    </h4>

                    <p className="text-xs text-[#4A4036] leading-relaxed mb-3 bg-[#FAF8F5] p-3 rounded-sm border border-[#EFE7DE]">
                      {msg.message}
                    </p>

                    <div className="flex items-center gap-3">
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                        className="text-xs text-[#132B20] hover:text-[#C85A32] font-semibold underline"
                      >
                        {t('மின்னஞ்சல் வழி பதிலளிக்க', 'Reply via Email')}
                      </a>
                      <button
                        onClick={() => deleteSubmission(msg.id)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        {t('செய்தியை நீக்க', 'Delete')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: Trust Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-[#E5DCD0] rounded-sm p-6 md:p-8 shadow-2xs max-w-3xl">
            <h3 className="font-tamil-serif font-bold text-xl text-[#132B20] mb-4">
              {t('அறக்கட்டளை தொடர்பு & பொது அமைப்புகள்', 'Trust Contact & Organization Settings')}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#19231D] mb-1">
                  {t('அறக்கட்டளை பெயர் (தமிழ்)', 'Trust Name (Tamil)')}
                </label>
                <input
                  type="text"
                  value={settings.trust_name_ta}
                  onChange={e => updateSettings({ trust_name_ta: e.target.value })}
                  className="w-full p-2 border border-[#DDD3C7] rounded-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#19231D] mb-1">
                  {t('அறக்கட்டளை பெயர் (ஆங்கிலம்)', 'Trust Name (English)')}
                </label>
                <input
                  type="text"
                  value={settings.trust_name_en}
                  onChange={e => updateSettings({ trust_name_en: e.target.value })}
                  className="w-full p-2 border border-[#DDD3C7] rounded-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#19231D] mb-1">
                  {t('நோக்க வாசகம் (Motto - Tamil)', 'Trust Motto (Tamil)')}
                </label>
                <input
                  type="text"
                  value={settings.motto_ta}
                  onChange={e => updateSettings({ motto_ta: e.target.value })}
                  className="w-full p-2 border border-[#DDD3C7] rounded-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#19231D] mb-1">
                  {t('நோக்க வாசகம் (Motto - English)', 'Trust Motto (English)')}
                </label>
                <input
                  type="text"
                  value={settings.motto_en}
                  onChange={e => updateSettings({ motto_en: e.target.value })}
                  className="w-full p-2 border border-[#DDD3C7] rounded-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#19231D] mb-1">
                    {t('தொலைபேசி எண்', 'Phone')}
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={e => updateSettings({ phone: e.target.value })}
                    className="w-full p-2 border border-[#DDD3C7] rounded-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#19231D] mb-1">
                    {t('மின்னஞ்சல் முகவரி', 'Email')}
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={e => updateSettings({ email: e.target.value })}
                    className="w-full p-2 border border-[#DDD3C7] rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#19231D] mb-1">
                  {t('அலுவலக முகவரி (தமிழ்)', 'Address (Tamil)')}
                </label>
                <input
                  type="text"
                  value={settings.address_ta}
                  onChange={e => updateSettings({ address_ta: e.target.value })}
                  className="w-full p-2 border border-[#DDD3C7] rounded-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#19231D] mb-1">
                  {t('YouTube பிளேலிஸ்ட் URL', 'YouTube Playlist URL')}
                </label>
                <input
                  type="text"
                  value={settings.youtube_playlist_url}
                  onChange={e => updateSettings({ youtube_playlist_url: e.target.value })}
                  className="w-full p-2 border border-[#DDD3C7] rounded-sm"
                />
              </div>

              <div className="pt-4 border-t border-[#E5DCD0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    showNotice(t('அமைப்புகள் சேமிக்கப்பட்டன.', 'Settings saved successfully.'));
                  }}
                  className="px-5 py-2.5 bg-[#132B20] text-white font-semibold rounded-sm hover:bg-[#1E3E2F]"
                >
                  {t('அமைப்புகளை சேமிக்க', 'Save Settings')}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all content and settings to factory defaults?')) {
                      resetToDefaults();
                      showNotice(t('இயல்பு நிலைக்கு மாற்றப்பட்டது.', 'Reset to factory defaults.'));
                    }
                  }}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t('இயல்பு நிலைக்கு மீட்டமைக்க', 'Reset to Defaults')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add or Edit Resource Item */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
            <div className="bg-[#FAF8F5] border border-[#E0D7CC] rounded-sm max-w-2xl w-full p-6 md:p-8 my-8 shadow-2xl">
              <h3 className="font-tamil-serif font-bold text-xl text-[#132B20] mb-4">
                {editingItem
                  ? t('வளத்தைத் திருத்துக', 'Edit Resource')
                  : t('புதிய வளத்தைச் சேர்க்க', 'Add New Resource')}
              </h3>

              <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#19231D] mb-1">
                      {t('தலைப்பு (தமிழ்)', 'Title (Tamil)')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title_ta}
                      onChange={e => setFormData({ ...formData, title_ta: e.target.value })}
                      className="w-full p-2 bg-white border border-[#DDD3C7] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#19231D] mb-1">
                      {t('தலைப்பு (ஆங்கிலம்)', 'Title (English)')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title_en}
                      onChange={e => setFormData({ ...formData, title_en: e.target.value })}
                      className="w-full p-2 bg-white border border-[#DDD3C7] rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#19231D] mb-1">
                    {t('விளக்கம் (தமிழ்)', 'Description (Tamil)')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description_ta}
                    onChange={e => setFormData({ ...formData, description_ta: e.target.value })}
                    className="w-full p-2 bg-white border border-[#DDD3C7] rounded-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#19231D] mb-1">
                    {t('விளக்கம் (ஆங்கிலம்)', 'Description (English)')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description_en}
                    onChange={e => setFormData({ ...formData, description_en: e.target.value })}
                    className="w-full p-2 bg-white border border-[#DDD3C7] rounded-sm"
                  />
                </div>

                {/* Specific fields depending on tab */}
                {activeTab === 'publications' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#19231D] mb-1">
                        {t('ஆசிரியர் / குழு', 'Author')}
                      </label>
                      <input
                        type="text"
                        value={formData.author_ta}
                        onChange={e => setFormData({ ...formData, author_ta: e.target.value })}
                        className="w-full p-2 bg-white border border-[#DDD3C7] rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#19231D] mb-1">ISBN</label>
                      <input
                        type="text"
                        value={formData.isbn}
                        onChange={e => setFormData({ ...formData, isbn: e.target.value })}
                        className="w-full p-2 bg-white border border-[#DDD3C7] rounded-sm"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'videos' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#19231D] mb-1">
                        YouTube Video ID / Playlist ID
                      </label>
                      <input
                        type="text"
                        value={formData.youtube_id}
                        onChange={e => setFormData({ ...formData, youtube_id: e.target.value })}
                        placeholder="PLqAGZgQ8AD2sxSFrSfhbHKMOjjxZ6CrHG"
                        className="w-full p-2 bg-white border border-[#DDD3C7] rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#19231D] mb-1">
                        {t('பேராசிரியர் பெயர்', 'Lecturer Name')}
                      </label>
                      <input
                        type="text"
                        value={formData.lecturer_ta}
                        onChange={e => setFormData({ ...formData, lecturer_ta: e.target.value })}
                        className="w-full p-2 bg-white border border-[#DDD3C7] rounded-sm"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'events' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#19231D] mb-1">
                        {t('நிகழ்வு தேதி (Date)', 'Event Date')}
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-2 bg-white border border-[#DDD3C7] rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#19231D] mb-1">
                        {t('அரங்கம் / இடம் (Venue)', 'Venue')}
                      </label>
                      <input
                        type="text"
                        value={formData.venue_ta}
                        onChange={e => setFormData({ ...formData, venue_ta: e.target.value })}
                        className="w-full p-2 bg-white border border-[#DDD3C7] rounded-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[#E5DCD0] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-[#FAF8F5] border border-[#DDD3C7] text-[#5C5044] rounded-sm"
                  >
                    {t('ரத்து செய்க', 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#C85A32] text-white font-semibold rounded-sm hover:bg-[#B54E29]"
                  >
                    {t('சேமிக்க', 'Save Resource')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
