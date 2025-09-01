import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UploadFile from '@/components/common/upload-file';
import ImageCompressor from '@/components/common/image-compressor';
import { useEffect, useState, useCallback } from 'react';
import type { FileWithPreview } from '@/hooks/use-file-upload';
import { useUploadImageMutation } from '@/services/imageApi';
import { useDispatch, useSelector } from 'react-redux';
import { setOriginalImage, unSetOriginalImage } from '@/features/imageSlice';
import { toast } from 'react-hot-toast';
import type { ApiError, Image, ProcessedImageType } from '@/types';
import type { RootState } from '@/app/store';
import { LazyButton } from '@/components/lazy-components';
import FormatForm, { type FormatFormValues } from '@/components/common/format-form';
import { Presets } from '@/constants/PRESETS';
import ProcessedImage from '@/components/common/processed-image';
import { SearchableSelectPreset } from '@/components/common/searchable-select-preset';

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

  const handlePresetSelect = useCallback((presetName: string) => {
    const selectedPreset = Presets.find((p) => p.name === presetName);
    if (!selectedPreset) return;

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

    setFormatConfig(newConfig);
    setSelectedPresetName(selectedPreset.name);
  }, []);

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

  return (
    <div className="flex h-full flex-col gap-2 overflow-x-auto rounded-xl p-2">
      {/* Upload Card */}
      <Card className="mx-auto w-full max-w-[1200px] rounded-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Image Resizer</CardTitle>
          <CardDescription>
            Resize, compress, and perfect your images — fast, easy, and high-quality for any format,
            exam, or ID.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Uploaded Image Preview */}
      {uploadedFile && uploadedImageData && uploadedImageData.id && (
        <Card className="mx-auto w-full max-w-[1200px] rounded-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Uploaded Image</CardTitle>
            <CardDescription>Image preview and details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex max-md:flex-col items-start gap-4">
              <div>
                {uploadedFile.file.type.startsWith('image/') && uploadedFile.preview && (
                  <div>
                    <p className="font-semibold text-xl mb-2">Preview:</p>
                    <img
                      src={uploadedFile.preview}
                      alt="Preview"
                      className="max-w-full max-h-64 rounded-md border"
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-xl mb-2">Detail:</p>
                <div className="flex flex-col items-start gap-4 mt-3">
                  <p>
                    <strong>Name:</strong> {uploadedFile.file.name}
                  </p>
                  <p>
                    <strong>Size:</strong> {(uploadedFile.file.size / 1024 / 1024).toFixed(2)}MB
                  </p>
                  <p>
                    <strong>Type:</strong> {uploadedImageData.type || 'N/A'}
                  </p>
                  <p>
                    <strong>Width:</strong> {uploadedImageData.width || 'N/A'} px
                  </p>
                  <p>
                    <strong>Height:</strong> {uploadedImageData.height || 'N/A'} px
                  </p>
                  <LazyButton variant="default" height={40}>
                    Download Original
                  </LazyButton>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Combined Card: FormatForm + Presets + Resize */}
      {uploadedFile && uploadedImageData && uploadedImageData.id && (
        <Card className="mx-auto w-full max-w-[1200px] rounded-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Image Format & Presets</CardTitle>
            <CardDescription>
              Configure your image format, choose a preset, and resize instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Format Form */}
            <FormatForm
              value={formatConfig || undefined}
              onChange={handleFormatChange}
              originalWidth={uploadedImageData.width || 0}
              originalHeight={uploadedImageData.height || 0}
              aspectRatio={(uploadedImageData.width || 1) / (uploadedImageData.height || 1)}
            />

            {/* Replaced Badges with SearchableSelectPreset */}
            <Card>
              <CardHeader>
                <CardTitle className="font-bold text-xl">Presets</CardTitle>
                <CardDescription>
                  Find suitable preset for you image according to exams.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SearchableSelectPreset
                  value={selectedPresetName}
                  onValueChange={handlePresetSelect}
                />
              </CardContent>
            </Card>

            {/* Resize Button */}
            {formatConfig && (
              <LazyButton
                className="w-full h-10 text-lg"
                variant="default"
                onClick={handleResize}
                disabled={!formatConfig}
              >
                Resize Image
              </LazyButton>
            )}
          </CardContent>
        </Card>
      )}

      {/* Processed Images */}
      {processedImages.length > 0 && (
        <Card className="mx-auto w-full max-w-[1200px] rounded-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Processed Images ({processedImages.length})
            </CardTitle>
            <CardDescription>Click download to save processed images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-lg:grid-cols-2">
              {processedImages.map((image, idx) => (
                <ProcessedImage
                  key={image.path} // ✅ Stable key
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
          </CardContent>
        </Card>
      )}

      {/* Image Compressor */}
      <Card className="mx-auto w-full max-w-[1200px] rounded-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Image Compressor</CardTitle>
          <CardDescription>Compress and download your images instantly.</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageCompressor />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
