import { useEffect, useState } from 'react';
import type { ProcessedImageType } from '@/types';
import { ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { downloadImage } from '@/utils';
import { Skeleton } from '../ui/skeleton'; // ✅ Import Skeleton
import { BASE_API_URL } from '@/constants/API';

type ExtendedProcessedImage = ProcessedImageType & {
  index: number;
  onRemove: () => void;
};

const ProcessedImage = ({
  name,
  url,
  path,
  width,
  height,
  dpi,
  quality,
  format,
  background,
  onRemove
}: ExtendedProcessedImage) => {
  const [fileSize, setFileSize] = useState<string>('Calculating...');
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const formattedImageUrl =
    `${BASE_API_URL}/cdn/img/` +
    `${height ? `height=${height.toFixed(0)},` : ''}` +
    `${width ? `width=${width.toFixed(0)},` : ''}` +
    `${dpi ? `dpi=${dpi},` : ''}` +
    `${quality ? `quality=${quality},` : ''}` +
    `${format ? `format=${format},` : ''}` +
    `${background ? `background=${background}` : ''}` +
    `/${path}`;

  useEffect(() => {
    const loadImageAndCalculateSize = async () => {
      try {
        const img = new Image();
        img.src = formattedImageUrl;

        img.onload = async () => {
          setIsImageLoaded(true);

          try {
            const response = await fetch(formattedImageUrl);
            const blob = await response.blob();

            const sizeInKB = blob.size / 1024;
            const sizeInMB = sizeInKB / 1024;

            setFileSize(sizeInMB >= 1 ? `${sizeInMB.toFixed(2)} MB` : `${sizeInKB.toFixed(2)} KB`);
          } catch (error) {
            // console.error("Error fetching blob:", error);
            setFileSize('Error');
          }
        };

        img.onerror = () => {
          // console.error("Failed to load image");
          setFileSize('Error');
        };
      } catch (error) {
        // console.error("Error loading image:", error);
        setFileSize('Error');
      }
    };

    loadImageAndCalculateSize();
  }, [formattedImageUrl]);

  const handleDownload = () => {
    const extension = format || 'png';
    const fileName = `${name.split('.')[0]}.${extension}`;
    downloadImage(formattedImageUrl, fileName);
  };

  return (
    <div className="flex flex-col w-xs rounded-xl border shadow-md overflow-hidden bg-card hover:border-primary/60 transition-colors">
      {/* Image Preview / Skeleton */}
      <div className="flex-shrink-0 w-full h-52 max-sm:h-36 bg-muted flex items-center justify-center">
        {!isImageLoaded ? (
          <Skeleton className="w-full h-full" />
        ) : url ? (
          <img src={formattedImageUrl} alt={name} className="object-cover h-full w-full" />
        ) : (
          <ImageIcon className="w-8 h-8 text-muted-foreground" />
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-1 py-3 px-4 border-l border-border">
        {!isImageLoaded ? (
          <>
            <Skeleton className="h-5 w-3/4 mb-2 rounded" />
            <Skeleton className="h-4 w-1/2 mb-2 rounded" />
            <Skeleton className="h-4 w-2/3 mb-2 rounded" />
            <Skeleton className="h-4 w-1/3 mb-2 rounded" />
            <Skeleton className="h-4 w-1/2 mb-2 rounded" />
            <Skeleton className="h-4 w-1/4 mb-2 rounded" />
            <Skeleton className="h-4 w-1/3 mb-2 rounded" />
          </>
        ) : (
          <>
            <div>
              <h3 className="font-medium text-lg sm:text-xl truncate text-card-foreground">
                {name.split('.')[0].length > 22
                  ? `${name.substring(0, 22).split('.')[0]}...`
                  : name.split('.')[0]}
              </h3>
            </div>
            <p className="text-md max-sm:text-sm text-muted-foreground mt-1">Width: {width}</p>
            <p className="text-md max-sm:text-sm text-muted-foreground mt-1">Height: {height}</p>
            <p className="text-md max-sm:text-sm text-muted-foreground mt-1">
              Resolution (DPI): {dpi}
            </p>
            <p className="text-md max-sm:text-sm text-muted-foreground mt-1">Quality: {quality}</p>
            <p className="text-md max-sm:text-sm text-muted-foreground mt-1">
              Format:{' '}
              <span className="uppercase text-md font-bold text-black dark:text-zinc-400">
                {format}
              </span>
            </p>
            <p className="text-md max-sm:text-sm text-muted-foreground mt-1">
              Size:{' '}
              <span className="uppercase text-md font-bold text-black dark:text-zinc-400">
                {isImageLoaded ? fileSize : 'Loading...'}
              </span>
            </p>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3 px-4 pb-4">
        {!isImageLoaded ? (
          <>
            <Skeleton className="h-9 w-24 rounded-3xl" />
            <Skeleton className="h-9 w-24 rounded-3xl" />
          </>
        ) : (
          <>
            <Button className="rounded-3xl" variant="outline" onClick={handleDownload}>
              Download
            </Button>
            <Button className="rounded-3xl" variant="destructive" onClick={onRemove}>
              Remove
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProcessedImage;
