import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  initialDocuments,
  initialEvents,
  initialImages,
  initialPublications,
  initialTrustSettings,
  initialVideos
} from '../data/initialData';
import {
  ContactSubmission,
  ContentType,
  DocumentItem,
  EventItem,
  ImageItem,
  PublicationItem,
  TrustSettings,
  VideoItem
} from '../types';

interface DataContextType {
  publications: PublicationItem[];
  documents: DocumentItem[];
  videos: VideoItem[];
  images: ImageItem[];
  events: EventItem[];
  settings: TrustSettings;
  contactSubmissions: ContactSubmission[];

  // Publication CRUD
  addPublication: (item: Omit<PublicationItem, 'id' | 'created_at' | 'updated_at'>) => void;
  updatePublication: (id: string, item: Partial<PublicationItem>) => void;
  deletePublication: (id: string) => void;

  // Document CRUD
  addDocument: (item: Omit<DocumentItem, 'id' | 'created_at' | 'updated_at'>) => void;
  updateDocument: (id: string, item: Partial<DocumentItem>) => void;
  deleteDocument: (id: string) => void;

  // Video CRUD
  addVideo: (item: Omit<VideoItem, 'id' | 'created_at' | 'updated_at'>) => void;
  updateVideo: (id: string, item: Partial<VideoItem>) => void;
  deleteVideo: (id: string) => void;

  // Image CRUD
  addImage: (item: Omit<ImageItem, 'id' | 'created_at' | 'updated_at'>) => void;
  updateImage: (id: string, item: Partial<ImageItem>) => void;
  deleteImage: (id: string) => void;

  // Event CRUD
  addEvent: (item: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: string, item: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<TrustSettings>) => void;

  // Contact
  addContactSubmission: (data: { name: string; email: string; subject: string; message: string }) => boolean;
  markSubmissionRead: (id: string) => void;
  deleteSubmission: (id: string) => void;

  // General toggles & helpers
  togglePublishStatus: (type: ContentType, id: string) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PUBLICATIONS: 'zhagaram_publications',
  DOCUMENTS: 'zhagaram_documents',
  VIDEOS: 'zhagaram_videos',
  IMAGES: 'zhagaram_images',
  EVENTS: 'zhagaram_events',
  SETTINGS: 'zhagaram_settings',
  CONTACTS: 'zhagaram_contacts',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [publications, setPublications] = useState<PublicationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PUBLICATIONS);
      return saved ? JSON.parse(saved) : initialPublications;
    } catch {
      return initialPublications;
    }
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      return saved ? JSON.parse(saved) : initialDocuments;
    } catch {
      return initialDocuments;
    }
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
      if (!saved) return initialVideos;
      const parsed: VideoItem[] = JSON.parse(saved);
      const missing = initialVideos.filter(iv => !parsed.some(pv => pv.id === iv.id));
      return missing.length > 0 ? [...missing, ...parsed] : parsed;
    } catch {
      return initialVideos;
    }
  });

  const [images, setImages] = useState<ImageItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IMAGES);
      if (!saved) return initialImages;
      const parsed: ImageItem[] = JSON.parse(saved);
      const missing = initialImages.filter(ii => !parsed.some(pi => pi.id === ii.id));
      return missing.length > 0 ? [...missing, ...parsed] : parsed;
    } catch {
      return initialImages;
    }
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : initialEvents;
    } catch {
      return initialEvents;
    }
  });

  const [settings, setSettings] = useState<TrustSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!saved) return initialTrustSettings;
      const parsed = JSON.parse(saved);
      if (
        !parsed.address_en ||
        parsed.address_en.includes('Omandurar') ||
        parsed.address_ta?.includes('ஓமந்தூரார்')
      ) {
        const updated = {
          ...parsed,
          address_ta: initialTrustSettings.address_ta,
          address_en: initialTrustSettings.address_en,
        };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
        return updated;
      }
      return parsed;
    } catch {
      return initialTrustSettings;
    }
  });

  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'c-1',
              name: 'Dr. R. Ramanathan',
              email: 'ramanathan.med@gmail.com',
              subject: 'Medical Terminology Collaboration',
              message: 'வணக்கம், உடலியங்கியல் பாடநூல் தயாரிப்பில் இணைந்து பங்களிக்க விரும்புகிறேன்.',
              date: '2026-02-14',
              read: false,
            },
          ];
    } catch {
      return [];
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PUBLICATIONS, JSON.stringify(publications));
  }, [publications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contactSubmissions));
  }, [contactSubmissions]);

  // Publication CRUD
  const addPublication = (item: Omit<PublicationItem, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newPub: PublicationItem = {
      ...item,
      id: `pub-${Date.now()}`,
      created_at: now,
      updated_at: now,
    };
    setPublications(prev => [newPub, ...prev]);
  };

  const updatePublication = (id: string, updates: Partial<PublicationItem>) => {
    const now = new Date().toISOString().split('T')[0];
    setPublications(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates, updated_at: now } : item))
    );
  };

  const deletePublication = (id: string) => {
    setPublications(prev => prev.filter(item => item.id !== id));
  };

  // Document CRUD
  const addDocument = (item: Omit<DocumentItem, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newDoc: DocumentItem = {
      ...item,
      id: `doc-${Date.now()}`,
      created_at: now,
      updated_at: now,
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const updateDocument = (id: string, updates: Partial<DocumentItem>) => {
    const now = new Date().toISOString().split('T')[0];
    setDocuments(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates, updated_at: now } : item))
    );
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(item => item.id !== id));
  };

  // Video CRUD
  const addVideo = (item: Omit<VideoItem, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newVid: VideoItem = {
      ...item,
      id: `vid-${Date.now()}`,
      created_at: now,
      updated_at: now,
    };
    setVideos(prev => [newVid, ...prev]);
  };

  const updateVideo = (id: string, updates: Partial<VideoItem>) => {
    const now = new Date().toISOString().split('T')[0];
    setVideos(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates, updated_at: now } : item))
    );
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(item => item.id !== id));
  };

  // Image CRUD
  const addImage = (item: Omit<ImageItem, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newImg: ImageItem = {
      ...item,
      id: `img-${Date.now()}`,
      created_at: now,
      updated_at: now,
    };
    setImages(prev => [newImg, ...prev]);
  };

  const updateImage = (id: string, updates: Partial<ImageItem>) => {
    const now = new Date().toISOString().split('T')[0];
    setImages(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates, updated_at: now } : item))
    );
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(item => item.id !== id));
  };

  // Event CRUD
  const addEvent = (item: Omit<EventItem, 'id'>) => {
    const newEvt: EventItem = {
      ...item,
      id: `evt-${Date.now()}`,
    };
    setEvents(prev => [newEvt, ...prev]);
  };

  const updateEvent = (id: string, updates: Partial<EventItem>) => {
    setEvents(prev => prev.map(item => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(item => item.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<TrustSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Contact
  const addContactSubmission = (data: { name: string; email: string; subject: string; message: string }) => {
    const now = new Date().toISOString().split('T')[0];
    const newSubmission: ContactSubmission = {
      id: `sub-${Date.now()}`,
      ...data,
      date: now,
      read: false,
    };
    setContactSubmissions(prev => [newSubmission, ...prev]);
    return true;
  };

  const markSubmissionRead = (id: string) => {
    setContactSubmissions(prev =>
      prev.map(sub => (sub.id === id ? { ...sub, read: true } : sub))
    );
  };

  const deleteSubmission = (id: string) => {
    setContactSubmissions(prev => prev.filter(sub => sub.id !== id));
  };

  // Toggle publish status
  const togglePublishStatus = (type: ContentType, id: string) => {
    if (type === 'publication') {
      setPublications(prev =>
        prev.map(p =>
          p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
        )
      );
    } else if (type === 'document') {
      setDocuments(prev =>
        prev.map(d =>
          d.id === id ? { ...d, status: d.status === 'published' ? 'draft' : 'published' } : d
        )
      );
    } else if (type === 'video') {
      setVideos(prev =>
        prev.map(v =>
          v.id === id ? { ...v, status: v.status === 'published' ? 'draft' : 'published' } : v
        )
      );
    } else if (type === 'image') {
      setImages(prev =>
        prev.map(i =>
          i.id === id ? { ...i, status: i.status === 'published' ? 'draft' : 'published' } : i
        )
      );
    }
  };

  // Reset to default sample verified content
  const resetToDefaults = () => {
    setPublications(initialPublications);
    setDocuments(initialDocuments);
    setVideos(initialVideos);
    setImages(initialImages);
    setEvents(initialEvents);
    setSettings(initialTrustSettings);
  };

  // Export & Import
  const exportDataJson = () => {
    return JSON.stringify(
      {
        publications,
        documents,
        videos,
        images,
        events,
        settings,
        export_date: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.publications) setPublications(data.publications);
      if (data.documents) setDocuments(data.documents);
      if (data.videos) setVideos(data.videos);
      if (data.images) setImages(data.images);
      if (data.events) setEvents(data.events);
      if (data.settings) setSettings(data.settings);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
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
        addContactSubmission,
        markSubmissionRead,
        deleteSubmission,
        togglePublishStatus,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
