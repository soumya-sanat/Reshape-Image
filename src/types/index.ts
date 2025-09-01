import type { ChangeEvent, DragEvent, InputHTMLAttributes } from "react";

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

export type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};


export type FileWithPreview = {
  file: File | FileMetadata;
  id: string;
  preview?: string;
};

export type FileUploadOptions = {
  maxFiles?: number; // Only used when multiple is true, defaults to Infinity
  maxSize?: number; // in bytes
  accept?: string;
  multiple?: boolean; // Defaults to false
  initialFiles?: FileMetadata[];
  onFilesChange?: (files: FileWithPreview[]) => void; // Callback when files change
  onFilesAdded?: (addedFiles: FileWithPreview[]) => void; // Callback when new files are added
};

export type FileUploadState = {
  files: FileWithPreview[];
  isDragging: boolean;
  errors: string[];
};

export type FileUploadActions = {
  addFiles: (files: FileList | File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  clearErrors: () => void;
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: () => void;
  getInputProps: (
    props?: InputHTMLAttributes<HTMLInputElement>
  ) => InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
};