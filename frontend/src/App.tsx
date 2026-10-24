import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ImagesPage } from './pages/ImagesPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { VideosPage } from './pages/VideosPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { ImageLightbox } from './components/modals/ImageLightbox';
import { DocumentViewerModal } from './components/modals/DocumentViewerModal';
import { VideoPlayerModal } from './components/modals/VideoPlayerModal';
import { PublicationDetailModal } from './components/modals/PublicationDetailModal';
import { DocumentItem, ImageItem, PublicationItem, VideoItem } from './types';

const MainAppContent: React.FC = () => {
  const { language } = useLanguage();
  const { publications, documents, videos, images } = useData();

  // Route state
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (['/about', '/images', '/documents', '/videos', '/publications', '/events', '/contact', '/admin'].includes(path)) {
        return path;
      }
    }
    return '/';
  });

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<PublicationItem | null>(null);

  // Sync with browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentRoute(path || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectItemFromSearch = (type: string, id: string) => {
    if (type === 'publication') {
      const item = publications.find(p => p.id === id);
      if (item) setSelectedPublication(item);
    } else if (type === 'document') {
      const item = documents.find(d => d.id === id);
      if (item) setSelectedDocument(item);
    } else if (type === 'video') {
      const item = videos.find(v => v.id === id);
      if (item) setSelectedVideo(item);
    } else if (type === 'image') {
      const item = images.find(img => img.id === id);
      if (item) setSelectedImage(item);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#19231D]">
      {/* Top Bar Navigation */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        {currentRoute === '/' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectPublication={pub => setSelectedPublication(pub)}
            onSelectImage={img => setSelectedImage(img)}
            onSelectVideo={vid => setSelectedVideo(vid)}
            onSelectDocument={doc => setSelectedDocument(doc)}
          />
        )}
        {currentRoute === '/about' && <AboutPage onNavigate={navigateTo} />}
        {currentRoute === '/publications' && (
          <PublicationsPage
            onSelectPublication={pub => setSelectedPublication(pub)}
          />
        )}
        {currentRoute === '/documents' && (
          <DocumentsPage
            onSelectDocument={doc => setSelectedDocument(doc)}
          />
        )}
        {currentRoute === '/videos' && (
          <VideosPage
            onSelectVideo={vid => setSelectedVideo(vid)}
          />
        )}
        {currentRoute === '/images' && (
          <ImagesPage
            onSelectImage={img => setSelectedImage(img)}
          />
        )}
        {currentRoute === '/events' && <EventsPage />}
        {currentRoute === '/contact' && <ContactPage />}
        {currentRoute === '/admin' && <AdminPage />}
      </main>

      {/* Shared Editorial Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
        onSelectItem={handleSelectItemFromSearch}
      />

      <ImageLightbox
        image={selectedImage}
        images={images.filter(i => i.status === 'published')}
        onClose={() => setSelectedImage(null)}
        onSelectImage={img => setSelectedImage(img)}
      />

      <DocumentViewerModal
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <PublicationDetailModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        onEnquire={() => {
          navigateTo('/contact');
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <MainAppContent />
      </LanguageProvider>
    </DataProvider>
  );
}
