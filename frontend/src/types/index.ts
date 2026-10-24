export type Language = 'ta' | 'en';

export type ContentType = 'image' | 'document' | 'video' | 'publication' | 'event';

export type ContentStatus = 'published' | 'draft' | 'archived';

export interface ResourceBase {
  id: string;
  slug: string;
  title_ta: string;
  title_en: string;
  description_ta: string;
  description_en: string;
  category: string;
  category_en: string;
  status: ContentStatus;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ImageItem extends ResourceBase {
  type: 'image';
  thumbnail_url?: string;
  image_url: string;
  alt_text_ta: string;
  alt_text_en: string;
  caption_ta: string;
  caption_en: string;
  dimensions?: string;
  credit?: string;
  visual_theme?: 'lecture' | 'workshop' | 'anatomy' | 'heritage' | 'research' | 'ceremony' | 'custom';
}

export interface DocumentItem extends ResourceBase {
  type: 'document';
  file_url: string;
  file_name: string;
  file_size: string;
  format: 'PDF' | 'DOCX' | 'EPUB';
  page_count: number;
  author_or_source_ta: string;
  author_or_source_en: string;
  publication_year: number;
  is_downloadable: boolean;
  sample_pages?: string[];
}

export interface VideoItem extends ResourceBase {
  type: 'video';
  provider: 'youtube' | 'direct';
  youtube_id?: string;
  direct_video_url?: string;
  thumbnail_url?: string;
  playlist_id?: string;
  playlist_title_ta?: string;
  playlist_title_en?: string;
  duration: string;
  lecturer_ta: string;
  lecturer_en: string;
  visual_theme?: string;
}

export interface PublicationItem extends ResourceBase {
  type: 'publication';
  cover_image?: string;
  author_ta: string;
  author_en: string;
  isbn?: string;
  publication_year: number;
  page_count: number;
  publisher_ta: string;
  publisher_en: string;
  price_inr?: number;
  is_free_download: boolean;
  download_url?: string;
  table_of_contents_ta?: string[];
  table_of_contents_en?: string[];
}

export interface EventItem {
  id: string;
  title_ta: string;
  title_en: string;
  description_ta: string;
  description_en: string;
  date: string;
  time: string;
  venue_ta: string;
  venue_en: string;
  is_upcoming: boolean;
  registration_url?: string;
  registration_open: boolean;
  category_ta: string;
  category_en: string;
  highlight?: string;
  poster_image?: string;
  contact_person?: string;
  contact_phone?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface TrustSettings {
  trust_name_ta: string;
  trust_name_en: string;
  motto_ta: string;
  motto_en: string;
  email: string;
  phone: string;
  address_ta: string;
  address_en: string;
  youtube_playlist_url: string;
  facebook_url?: string;
  twitter_url?: string;
  registration_number: string;
}
