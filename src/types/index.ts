export type Image = {
  id?: number | null;
  url?: string | null;
  path?: string | null;
  name?: string | null;
  size?: number | null;
  type?: string | null;
  width?: number | null;
  height?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ProcessedImageType = {
  name: string;
  url: string;
  path: string;
  width: number;
  height: number;
  dpi: number;
  quality: number;
  format: string;
  background: string;
  size: number;
  type: string;
};

export type ApiError = {
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
  error?: string;
};

export type PresetFormat = {
  name: string;
  property: {
    width: number;
    height: number;
    dpi: number;
    quality: number;
    format: 'jpg' | 'png' | 'webp' | 'jpeg' | 'gif' | 'avif' | 'tiff' | 'bmp' | 'heic';
    background: 'white' | 'black';
  };
};
