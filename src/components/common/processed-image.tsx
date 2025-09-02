import { useEffect, useMemo, useState } from 'react';
import type { ProcessedImageType } from '@/types';
import { Download, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { downloadImage } from '@/utils';
import { Skeleton } from '../ui/skeleton';
import { BASE_API_URL } from '@/constants/API';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
// import { LazyButton } from '@/components/lazy-components/lazy-button';

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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const formattedImageUrl = useMemo(() => {
    return (
      `${BASE_API_URL}/cdn/img/` +
      `${height ? `height=${height.toFixed(0)},` : ''}` +
      `${width ? `width=${width.toFixed(0)},` : ''}` +
      `${dpi ? `dpi=${dpi},` : ''}` +
      `${quality ? `quality=${quality},` : ''}` +
      `${format ? `format=${format},` : ''}` +
      `${background ? `background=${background}` : ''}` +
      `/${path}`
    );
  }, [height, width, dpi, quality, format, background, path]);

  useEffect(() => {
    let isMounted = true;

    const fetchImageSize = async () => {
      try {
        const response = await fetch(formattedImageUrl);
        const blob = await response.blob();

        if (!isMounted) return;

        const sizeKB = blob.size / 1024;
        const sizeMB = sizeKB / 1024;

        setFileSize(sizeMB >= 1 ? `${sizeMB.toFixed(2)} MB` : `${sizeKB.toFixed(2)} KB`);
        setIsImageLoaded(true);
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching size:', error);
          setFileSize('Error');
          setIsImageLoaded(false);
        }
      }
    };

    fetchImageSize();

    return () => {
      isMounted = false;
    };
  }, [formattedImageUrl]);

  const handleDownload = () => {
    const extension = format || 'png';
    const fileName = `${name.split('.')[0]}_${width}x${height}.${extension}`;
    downloadImage(formattedImageUrl, fileName);
  };

  const handlePreview = () => {
    window.open(formattedImageUrl, '_blank');
  };

  const formatName = (fileName: string) => {
    const baseName = fileName.split('.')[0];
    return baseName.length > 18 ? `${baseName.substring(0, 15)}...` : baseName;
  };

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 hover:border-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Preview with Overlay */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
        {!isImageLoaded ? (
          <Skeleton className="w-full h-full rounded-none" />
        ) : (
          <>
            <img
              src={formattedImageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div
              className={`absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-2 group-hover:opacity-100 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full backdrop-blur-sm"
                onClick={handlePreview}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Preview
              </Button>
            </div>
          </>
        )}
      </div>

      <CardHeader className="p-4 pb-1">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg text-foreground truncate flex-1">
            {formatName(name)}
          </h3>
          <Badge variant="secondary" className="ml-2 shrink-0 uppercase">
            {format}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {width} × {height} px
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {!isImageLoaded ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Quality</p>
              <p className="font-medium text-foreground">{quality}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">DPI</p>
              <p className="font-medium text-foreground">{dpi}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Background</p>
              <p className="font-medium text-foreground capitalize">{background}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Size</p>
              <p className="font-medium text-foreground">{fileSize}</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {!isImageLoaded ? (
          <div className="flex gap-2 w-full">
            <Skeleton className="h-9 flex-1 rounded-full" />
            <Skeleton className="h-9 flex-1 rounded-full" />
          </div>
        ) : (
          <div className="flex gap-2 w-full">
            <Button
              variant="default"
              size="sm"
              className="flex-1 rounded-full gap-2 transition-all hover:shadow-md"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all"
              onClick={onRemove}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardFooter>

      {/* Loading indicator */}
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </Card>
  );
};

export default ProcessedImage;
