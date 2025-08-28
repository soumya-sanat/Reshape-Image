import { useState, useRef, useEffect } from "react";
import UploadFile from "@/components/common/upload-file";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Lock, Unlock } from "lucide-react";
import type { FileWithPreview } from "@/hooks/use-file-upload";
import { useDebounce } from "@/hooks/use-debounce";

const ImageResizerCompressor = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [aspectLocked, setAspectLocked] = useState(true);
  const [quality, setQuality] = useState(100);
  const [sizes, setSizes] = useState({
    original: "N/A",
    current: "N/A",
    compressed: "N/A",
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Format size in KB / MB
  const sizeFormat = (bytes: number) => {
    const kb = Math.floor((bytes / 1024) * 100) / 100;
    return kb >= 1024
      ? `${Math.floor((kb / 1024) * 100) / 100} MB`
      : `${kb} KB`;
  };

  // Handle file upload & generate preview
  const handleFileChange = (files: FileWithPreview[]) => {
    if (!files.length) return;
    const file = files[0];
    const preview = URL.createObjectURL(file.file);

    setUploadedFiles([{ ...file, preview }]);
    setPreviewUrl(preview);

    const img = new Image();
    img.src = preview;

    img.onload = () => {
      setOriginalImage(img);
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setSizes({
        original: sizeFormat(file.file.size),
        current: sizeFormat(file.file.size),
        compressed: "N/A",
      });
    };
  };

  // Resize + Compress using Canvas
  const resizeAndCompress = (compressing = false) => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const blobURL = URL.createObjectURL(blob);
        setPreviewUrl(blobURL);

        setSizes((prev) => ({
          ...prev,
          current: sizeFormat(blob.size),
          compressed: compressing ? sizeFormat(blob.size) : prev.compressed,
        }));
      },
      "image/jpeg",
      quality / 100
    );
  };

  // Update width
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setDimensions((prev) => ({
      width: newWidth,
      height: aspectLocked
        ? Math.floor(
            newWidth /
              (originalImage!.naturalWidth / originalImage!.naturalHeight)
          )
        : prev.height,
    }));
  };

  // Update height
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setDimensions((prev) => ({
      width: aspectLocked
        ? Math.floor(
            newHeight *
              (originalImage!.naturalWidth / originalImage!.naturalHeight)
          )
        : prev.width,
      height: newHeight,
    }));
  };

  // Reset to original dimensions
  const handleReset = () => {
    if (!originalImage) return;
    setDimensions({
      width: originalImage.naturalWidth,
      height: originalImage.naturalHeight,
    });
    setQuality(1);
    resizeAndCompress(true);
  };

  // Download compressed image
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/jpeg", quality);
    link.download = `compressed_${Date.now()}.jpg`;
    link.click();
  };

  // Re-render on dimension or quality change
  // Debounce effect for resizing & compression

  // Debounced states
  const debouncedDimensions = useDebounce(dimensions, 1000);
  const debouncedQuality = useDebounce(quality, 1000);

  useEffect(() => {
    if (originalImage) {
      resizeAndCompress();
    }
  }, [debouncedDimensions, debouncedQuality]);

  return (
    <div className="max-w-[1200px] m-auto p-4">
      <Card className="w-full h-fit">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Image Resizer & Compressor
          </CardTitle>
          <CardDescription>
            Resize, compress, and download your images instantly.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UploadFile
            maxFiles={1}
            maxSize={20 * 1024 * 1024}
            accept="image/*"
            multiple={false}
            onFilesChange={handleFileChange}
          />

          {uploadedFiles.length > 0 && (
            <div className="mt-6 flex flex-col gap-6">
              {/* Preview Section */}
              {previewUrl && (
                <div className="w-full flex justify-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full rounded-lg shadow-md border"
                  />
                </div>
              )}

              {/* Resize Inputs */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-col w-full">
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={dimensions.width}
                    onChange={handleWidthChange}
                  />
                </div>

                <div
                  className="cursor-pointer mt-6"
                  onClick={() => setAspectLocked(!aspectLocked)}
                >
                  {aspectLocked ? <Lock size={24} /> : <Unlock size={24} />}
                </div>

                <div className="flex flex-col w-full">
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={dimensions.height}
                    onChange={handleHeightChange}
                  />
                </div>
              </div>

              {/* Compression Slider */}
              <div className="flex flex-col gap-2">
                <Label>Quality ({quality}%)</Label>
                <Slider
                  value={[quality]}
                  onValueChange={(val) => setQuality(val[0])}
                  max={100}
                  min={1}
                  step={1}
                />
              </div>

              {/* Info Section */}
              <div className="flex flex-col gap-2 text-sm p-3 rounded-lg border">
                <div>Original Size: {sizes.original}</div>
                <div>Current Size: {sizes.current}</div>
                <div>Compressed Size: {sizes.compressed}</div>
                <div>
                  Dimensions: {dimensions.width} x {dimensions.height}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button variant="secondary" onClick={handleReset}>
                  Reset
                </Button>
                <Button onClick={handleDownload}>Download</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default ImageResizerCompressor;
