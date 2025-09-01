import {
  LazyCard,
  LazyCardContent,
  LazyCardDescription,
  LazyCardHeader,
  LazyCardTitle
} from '@/components/lazy-components/lazy-card';
import UploadFile from '@/components/common/upload-file';
import ImageCompressor from '@/components/common/image-compressor';
import { useEffect, useState, useCallback } from 'react';

import { useUploadImageMutation } from '@/services/imageApi';
import { useDispatch, useSelector } from 'react-redux';
import { setOriginalImage, unSetOriginalImage } from '@/features/imageSlice';
import { toast } from 'react-hot-toast';
import type { ApiError, FileWithPreview, Image, ProcessedImageType } from '@/types';
import type { RootState } from '@/app/store';
import { LazyButton } from '@/components/lazy-components/lazy-button';
import FormatForm, { type FormatFormValues } from '@/components/common/format-form';
import { Presets } from '@/constants/PRESETS';
import ProcessedImage from '@/components/common/processed-image';
import { SearchableSelectPreset } from '@/components/common/searchable-select-preset';
import { downloadImage } from '@/utils';

const Home = () => {
  const [uploadedFile, setUploadedFile] = useState<FileWithPreview | null>(null);
  const [uploadImage, { isLoading: isUploading, error: uploadError }] = useUploadImageMutation();
  const dispatch = useDispatch();

  const uploadedImageData = useSelector((state: RootState) => state.image);
  const [formatConfig, setFormatConfig] = useState<FormatFormValues | null>(null);
  const [processedImages, setProcessedImages] = useState<ProcessedImageType[]>([]);
  const [selectedPresetName, setSelectedPresetName] = useState<string | null>(null);

  const handleFilesAdded = useCallback(
    async (files: FileWithPreview[]) => {
      if (files.length > 0) {
        const fileObject = files[0];
        setUploadedFile(fileObject);

        try {
          const response = await uploadImage(fileObject.file).unwrap();

          if (response.data) {
            const uploadedImage: Image = response.data;
            dispatch(setOriginalImage(uploadedImage));
            toast.success('Image uploaded successfully!');
          }
        } catch (error: unknown) {
          const err = error as ApiError;

          if (err.data?.errors) {
            const firstError = Object.values(err.data.errors)[0][0];
            toast.error(firstError);
          } else if (err.data?.message) {
            toast.error(err.data.message);
          } else if (err.error) {
            toast.error('Network/server error. Please try again.');
          } else {
            toast.error('Unknown error occurred. Please try again.');
          }
        }
      }
    },
    [uploadImage, dispatch]
  );

  const handleFilesChange = useCallback(
    (files: FileWithPreview[]) => {
      setTimeout(() => {
        if (files.length === 0) {
          setUploadedFile(null);
          dispatch(unSetOriginalImage());
          setProcessedImages([]);
          setFormatConfig(null);
          setSelectedPresetName(null);
        } else {
          const fileObject = files[0];
          setUploadedFile(fileObject);
        }
      }, 0);
    },
    [dispatch]
  );

  const handleFormatChange = useCallback((values: FormatFormValues) => {
    setFormatConfig(values);
    setSelectedPresetName(null);
  }, []);

  const handleResize = () => {
    if (!uploadedImageData) {
      toast.error('⚠️ Please upload an image first!');
      return;
    }
    if (!formatConfig) {
      toast('Please configure resize settings first!', {
        duration: 2000,
        position: 'bottom-center',
        icon: '⚠️'
      });
      return;
    }

    const newProcessed: ProcessedImageType = {
      name: uploadedImageData.name || 'processed_image',
      url: uploadedImageData.url || '',
      path: uploadedImageData.path || '',
      width: formatConfig.widthPx,
      height: formatConfig.heightPx,
      dpi: formatConfig.dpi,
      quality: formatConfig.quality,
      format: formatConfig.format,
      background: formatConfig.background,
      size: 0,
      type: ''
    };

    setProcessedImages((prev) => [...prev, newProcessed]);
    toast.success('🎉 Image resized successfully!');
  };

  const handlePresetSelect = useCallback(
    (presetName: string) => {
      const selectedPreset = Presets.find((p) => p.name === presetName);
      if (!selectedPreset || !uploadedImageData) return;

      // Preserve the original image dimensions, override only preset-specific fields
      const newConfig: FormatFormValues = {
        width: selectedPreset.property.width,
        height: selectedPreset.property.height,
        dpi: selectedPreset.property.dpi,
        quality: selectedPreset.property.quality,
        format: selectedPreset.property.format,
        background: selectedPreset.property.background,
        unit: 'pixel',
        aspectLock: true,
        widthPx: selectedPreset.property.width,
        heightPx: selectedPreset.property.height
      };

      // Merge with existing format config if available
      setFormatConfig((prev) => ({
        ...prev,
        ...newConfig
      }));

      setSelectedPresetName(selectedPreset.name);
    },
    [uploadedImageData]
  );

  useEffect(() => {
    if (!formatConfig) return;

    const matchedPreset = Presets.find(
      (preset) =>
        preset.property.width === formatConfig.widthPx &&
        preset.property.height === formatConfig.heightPx &&
        preset.property.dpi === formatConfig.dpi &&
        preset.property.quality === formatConfig.quality &&
        preset.property.format === formatConfig.format &&
        preset.property.background === formatConfig.background
    );

    if (matchedPreset && !selectedPresetName) {
      setSelectedPresetName(matchedPreset.name);
    }
  }, [formatConfig, selectedPresetName]);

  useEffect(() => {
    return () => {
      if (uploadedFile?.preview) {
        URL.revokeObjectURL(uploadedFile.preview);
      }
    };
  }, [uploadedFile]);

  const handleDownloadOriginalImage = () => {
    if (!uploadedImageData || !uploadedImageData.url) return;

    const extension = uploadedImageData.type?.split('/')[1] || 'png';
    const fileName = `${uploadedImageData.name?.split('.')[0] || 'image'}.${extension}`;
    downloadImage(uploadedImageData.url, fileName);
  };
  return (
    <div className="flex h-full flex-col gap-2 overflow-x-auto rounded-xl p-2">
      <LazyCard className="mx-auto w-full max-w-[1200px] rounded-md">
        <LazyCardHeader>
          <LazyCardTitle className="text-2xl font-bold">Image Resizer</LazyCardTitle>
          <LazyCardDescription>
            Resize, compress, and perfect your images — fast, easy, and high-quality for any format,
            exam, or ID.
          </LazyCardDescription>
        </LazyCardHeader>
        <LazyCardContent>
          <UploadFile
            maxFiles={1}
            maxSize={10 * 1024 * 1024}
            accept="image/*"
            multiple={false}
            onFilesAdded={handleFilesAdded}
            onFilesChange={handleFilesChange}
          />
          {isUploading && (
            <div className="mt-4 text-center text-sm text-muted-foreground">Uploading image...</div>
          )}
          {uploadError && (
            <div className="mt-4 text-center text-sm text-destructive">
              Upload failed. Please try again.
            </div>
          )}
        </LazyCardContent>
      </LazyCard>

      {/* Uploaded Image Preview */}
      {uploadedFile && uploadedImageData && uploadedImageData.id && (
        <LazyCard className="w-full max-w-[1200px]  mx-auto rounded-md shadow-lg border  ">
          <LazyCardHeader className="border-b">
            <LazyCardTitle className="text-2xl font-bold">Uploaded Image Details</LazyCardTitle>
            <LazyCardDescription className="text-sm text-gray-500">
              Image details with original height and width.
            </LazyCardDescription>
          </LazyCardHeader>
          <LazyCardContent className="">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <span className="block text-xs uppercase font-semibold text-gray-400 dark:text-white mb-1">
                  Name
                </span>
                <span className="text-base text-gray-700 dark:text-zinc-400">
                  {uploadedFile.file.name}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase font-semibold text-gray-400 dark:text-white mb-1">
                  Size
                </span>
                <span className="text-base text-gray-700 dark:text-zinc-400">
                  {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase font-semibold text-gray-400 dark:text-white mb-1">
                  Type
                </span>
                <span className="text-base text-gray-700 dark:text-zinc-400">
                  {uploadedImageData.type || 'N/A'}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase font-semibold text-gray-400 dark:text-white mb-1">
                  Dimensions
                </span>
                <span className="text-base text-gray-700 dark:text-zinc-400">
                  {uploadedImageData.width || 'N/A'} × {uploadedImageData.height || 'N/A'} px
                </span>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <LazyButton
                variant="default"
                height={44}
                onClick={handleDownloadOriginalImage}
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow">
                Download Original
              </LazyButton>
            </div>
          </LazyCardContent>
        </LazyCard>
      )}

      {/* Combined Card: FormatForm + Presets + Resize */}
      {uploadedFile && uploadedImageData && uploadedImageData.id && (
        <LazyCard className="mx-auto w-full max-w-[1200px] rounded-md">
          <LazyCardHeader>
            <LazyCardTitle className="text-xl font-bold">Image Format & Presets</LazyCardTitle>
            <LazyCardDescription>
              Configure your image format, choose a preset, and resize instantly.
            </LazyCardDescription>
          </LazyCardHeader>
          <LazyCardContent className="space-y-6">
            {/* Format Form */}
            <FormatForm
              value={formatConfig || undefined}
              onChange={handleFormatChange}
              originalWidth={uploadedImageData.width || 0}
              originalHeight={uploadedImageData.height || 0}
              aspectRatio={(uploadedImageData.width || 1) / (uploadedImageData.height || 1)}
            />

            {/* Replaced Badges with SearchableSelectPreset */}
            <LazyCard>
              <LazyCardHeader>
                <LazyCardTitle className="font-bold text-xl">Presets</LazyCardTitle>
                <LazyCardDescription>
                  Find suitable preset for you image according to exams.
                </LazyCardDescription>
              </LazyCardHeader>
              <LazyCardContent>
                <SearchableSelectPreset
                  value={selectedPresetName}
                  onValueChange={handlePresetSelect}
                />
              </LazyCardContent>
            </LazyCard>

            {/* Resize Button */}
            {formatConfig && (
              <LazyButton
                className="w-full h-10 text-lg"
                variant="default"
                onClick={handleResize}
                disabled={!formatConfig}>
                Resize Image
              </LazyButton>
            )}
          </LazyCardContent>
        </LazyCard>
      )}

      {/* Processed Images */}
      {processedImages.length > 0 && (
        <LazyCard className="mx-auto w-full max-w-[1200px] rounded-md">
          <LazyCardHeader>
            <LazyCardTitle className="text-xl font-bold">
              Processed Images ({processedImages.length})
            </LazyCardTitle>
            <LazyCardDescription>Click download to save processed images</LazyCardDescription>
          </LazyCardHeader>
          <LazyCardContent>
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-lg:grid-cols-2">
              {[...processedImages].reverse().map((image, idx) => (
                <ProcessedImage
                  key={image.path}
                  name={image.name}
                  url={image.url}
                  path={image.path}
                  width={image.width}
                  height={image.height}
                  dpi={image.dpi}
                  quality={image.quality}
                  format={image.format}
                  background={image.background}
                  index={processedImages.length - 1 - idx}
                  onRemove={() =>
                    setProcessedImages((prev) =>
                      prev.filter((_, i) => i !== processedImages.length - 1 - idx)
                    )
                  }
                  size={0}
                  type=""
                />
              ))}
            </div>
          </LazyCardContent>
        </LazyCard>
      )}

      {/* Image Compressor */}
      <LazyCard className="mx-auto w-full max-w-[1200px] rounded-md">
        <LazyCardHeader>
          <LazyCardTitle className="text-2xl font-bold">Image Compressor</LazyCardTitle>
          <LazyCardDescription>Compress and download your images instantly.</LazyCardDescription>
        </LazyCardHeader>
        <LazyCardContent>
          <ImageCompressor />
        </LazyCardContent>
      </LazyCard>
    </div>
  );
};

export default Home;
