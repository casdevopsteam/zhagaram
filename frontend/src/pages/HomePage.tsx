import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedResources } from '../components/home/FeaturedResources';
import { MedicalEducationSection } from '../components/home/MedicalEducationSection';
import { TrustIntroSection } from '../components/home/TrustIntroSection';
import { LatestPublicationsSection } from '../components/home/LatestPublicationsSection';
import { GalleryPreviewSection } from '../components/home/GalleryPreviewSection';
import { FeaturedVideosSection } from '../components/home/FeaturedVideosSection';
import { EventsPreviewSection } from '../components/home/EventsPreviewSection';
import { DocumentsPreviewSection } from '../components/home/DocumentsPreviewSection';
import { AnnouncementBanner } from '../components/home/AnnouncementBanner';
import { DocumentItem, ImageItem, PublicationItem, VideoItem } from '../types';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onSelectPublication: (pub: PublicationItem) => void;
  onSelectImage: (img: ImageItem) => void;
  onSelectVideo: (vid: VideoItem) => void;
  onSelectDocument: (doc: DocumentItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectPublication,
  onSelectImage,
  onSelectVideo,
  onSelectDocument,
}) => {
  return (
    <div className="w-full">
      <HeroSection onNavigate={onNavigate} />
      <FeaturedResources onNavigate={onNavigate} />
      <MedicalEducationSection onNavigate={onNavigate} />
      
      {/* 1. Dedicated Events Section with real poster images */}
      <EventsPreviewSection onNavigate={onNavigate} />

      {/* 2. Dedicated Images Library Section with authentic photos & lightbox */}
      <GalleryPreviewSection
        onNavigate={onNavigate}
        onSelectImage={onSelectImage}
      />

      {/* 3. Dedicated Videos Section with MBBS series & direct playback */}
      <FeaturedVideosSection
        onNavigate={onNavigate}
        onSelectVideo={onSelectVideo}
      />

      {/* 4. Dedicated Documents Section with real Kanaiyazhi & BNT PDFs */}
      <DocumentsPreviewSection
        onNavigate={onNavigate}
        onSelectDocument={onSelectDocument}
      />

      {/* 5. Trust Pedagogy & Background */}
      <TrustIntroSection onNavigate={onNavigate} />

      {/* 6. Textbooks & Publications Catalog */}
      <LatestPublicationsSection
        onNavigate={onNavigate}
        onSelectPublication={onSelectPublication}
      />

      {/* 7. Promotional Announcement Banner */}
      <AnnouncementBanner onNavigate={onNavigate} />
    </div>
  );
};
