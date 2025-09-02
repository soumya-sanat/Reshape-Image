import { convertDimension } from '@/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import EditableNumber from './editable-number';
import { Slider } from '@/components/ui/slider';
import { LazyButton } from '@/components/lazy-components/lazy-button';
import { Input } from '../ui/input';
import { Lock, LockOpen, RotateCcw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select';

export interface FormatFormValues {
  width: number;
  height: number;
  aspectLock: boolean;
  unit: 'pixel' | 'centimeter' | 'percent' | 'inch';
  dpi: number;
  quality: number;
  format: 'jpg' | 'png' | 'webp' | 'jpeg' | 'gif' | 'avif' | 'tiff' | 'bmp' | 'heic';
  background: 'white' | 'black';
  widthPx: number;
  heightPx: number;
}

interface FormatFormProps {
  value?: FormatFormValues;
  initial?: Partial<FormatFormValues>;
  onChange: (values: FormatFormValues) => void;
  originalWidth?: number;
  originalHeight?: number;
  aspectRatio?: number;
}

const FormatForm = ({
  value,
  initial,
  onChange,
  originalWidth = 1280,
  originalHeight = 825,
  aspectRatio = originalWidth / originalHeight
}: FormatFormProps) => {
  const [baseWidthPx, setBaseWidthPx] = useState(initial?.widthPx ?? originalWidth);
  const [baseHeightPx, setBaseHeightPx] = useState(initial?.heightPx ?? originalHeight);

  const [aspectLock, setAspectLock] = useState(initial?.aspectLock ?? true);
  const [unit, setUnit] = useState<FormatFormValues['unit']>(initial?.unit ?? 'pixel');
  const [dpi, setDpi] = useState(initial?.dpi ?? 72);
  const [quality, setQuality] = useState(initial?.quality ?? 90);
  const [format, setFormat] = useState<FormatFormValues['format']>(initial?.format ?? 'jpg');
  const [background, setBackground] = useState<FormatFormValues['background']>(
    initial?.background ?? 'white'
  );

  const [width, setWidth] = useState(() =>
    convertDimension(baseWidthPx, 'pixel', unit, originalWidth, dpi)
  );
  const [height, setHeight] = useState(() =>
    convertDimension(baseHeightPx, 'pixel', unit, originalHeight, dpi)
  );

  // Store original values for reset
  const originalValues = useMemo(
    () => ({
      widthPx: originalWidth,
      heightPx: originalHeight,
      aspectLock: true,
      unit: 'pixel' as const,
      dpi: 72,
      quality: 90,
      format: 'jpg' as const,
      background: 'white' as const,
      width: convertDimension(originalWidth, 'pixel', 'pixel', originalWidth, 72),
      height: convertDimension(originalHeight, 'pixel', 'pixel', originalHeight, 72)
    }),
    [originalWidth, originalHeight]
  );

  const onToggleAspectLock = () => setAspectLock((p) => !p);

  // Reset to original values
  const handleReset = () => {
    setBaseWidthPx(originalValues.widthPx);
    setBaseHeightPx(originalValues.heightPx);
    setAspectLock(originalValues.aspectLock);
    setUnit(originalValues.unit);
    setDpi(originalValues.dpi);
    setQuality(originalValues.quality);
    setFormat(originalValues.format);
    setBackground(originalValues.background);
    setWidth(originalValues.width);
    setHeight(originalValues.height);
  };

  // --- Width change ---
  const handleWidthChange = (val: number) => {
    const pxVal = convertDimension(val, unit, 'pixel', originalWidth, dpi);
    setBaseWidthPx(pxVal);
    setWidth(val);

    if (aspectLock) {
      const newHeightPx = Math.round(pxVal / aspectRatio);
      setBaseHeightPx(newHeightPx);
      setHeight(convertDimension(newHeightPx, 'pixel', unit, originalHeight, dpi));
    }
  };

  // --- Height change ---
  const handleHeightChange = (val: number) => {
    const pxVal = convertDimension(val, unit, 'pixel', originalHeight, dpi);
    setBaseHeightPx(pxVal);
    setHeight(val);

    if (aspectLock) {
      const newWidthPx = Math.round(pxVal * aspectRatio);
      setBaseWidthPx(newWidthPx);
      setWidth(convertDimension(newWidthPx, 'pixel', unit, originalWidth, dpi));
    }
  };

  useEffect(() => {
    setWidth(convertDimension(baseWidthPx, 'pixel', unit, originalWidth, dpi));
    setHeight(convertDimension(baseHeightPx, 'pixel', unit, originalHeight, dpi));
  }, [unit, dpi, baseWidthPx, baseHeightPx, originalWidth, originalHeight]);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (value) {
      setBaseWidthPx(value.widthPx);
      setBaseHeightPx(value.heightPx);
      setAspectLock(value.aspectLock);
      setUnit(value.unit);
      setDpi(value.dpi);
      setQuality(value.quality);
      setFormat(value.format);
      setBackground(value.background);

      // Recalculate display values based on unit & dpi
      setWidth(convertDimension(value.widthPx, 'pixel', value.unit, originalWidth, value.dpi));
      setHeight(convertDimension(value.heightPx, 'pixel', value.unit, originalHeight, value.dpi));
    }
  }, [value, originalWidth, originalHeight]);

  const values = useMemo<FormatFormValues>(
    () => ({
      width,
      height,
      aspectLock,
      unit,
      dpi,
      quality,
      format,
      background,
      widthPx: baseWidthPx,
      heightPx: baseHeightPx
    }),
    [width, height, aspectLock, unit, dpi, quality, format, background, baseWidthPx, baseHeightPx]
  );

  useEffect(() => {
    onChangeRef.current?.(values);
  }, [values]);

  const lastValuesRef = useRef<FormatFormValues | null>(null);
  useEffect(() => {
    const last = lastValuesRef.current;
    const changed =
      !last ||
      last.width !== values.width ||
      last.height !== values.height ||
      last.aspectLock !== values.aspectLock ||
      last.unit !== values.unit ||
      last.dpi !== values.dpi ||
      last.quality !== values.quality ||
      last.format !== values.format ||
      last.background !== values.background;

    if (changed) {
      onChangeRef.current?.(values);
      lastValuesRef.current = values;
    }
  }, [values]);

  return (
    <div className="my-2 w-full border rounded-lg shadow-sm bg-background p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Format Image</h2>
          <p className="text-muted-foreground text-sm">
            Input the configuration you want for your image
          </p>
        </div>
        <LazyButton
          type="button"
          onClick={handleReset}
          variant="outline"
          className="flex items-center gap-2"
          title="Reset to original values"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </LazyButton>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-2 w-full">
          {/* Width / Height + Lock */}
          <div className="flex items-center justify-between gap-7 mb-4 w-full">
            <div className="flex-1 flex flex-col">
              <label className="block text-muted-foreground mb-1">Width ({unit})</label>
              <Input
                type="number"
                value={width}
                min={1}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
              />
            </div>
            <div className="h-max flex flex-col justify-center items-end">
              <label className="block mb-1 text-transparent">.</label>
              <LazyButton
                type="button"
                onClick={onToggleAspectLock}
                variant={aspectLock ? 'default' : 'outline'}
                title={aspectLock ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
              >
                {aspectLock ? <Lock /> : <LockOpen />}
              </LazyButton>
            </div>
            <div className="flex-1 flex flex-col">
              <label className="block text-muted-foreground mb-1">Height ({unit})</label>
              <Input
                type="number"
                value={height}
                min={1}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Unit & Format */}
          <div className="flex flex-row max-md:flex-col max-md:gap-1 gap-24 items-center justify-between w-full">
            <div className="mb-4 flex-1 max-md:w-full">
              <label className="block text-muted-foreground mb-1">Unit</label>
              <Select value={unit} onValueChange={(val) => setUnit(val as typeof unit)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Unit</SelectLabel>
                    <SelectItem value="inch">Inch</SelectItem>
                    <SelectItem value="pixel">Pixel</SelectItem>
                    <SelectItem value="percent">Percentage</SelectItem>
                    <SelectItem value="centimeter">Centimeter</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4 flex-1 max-md:w-full">
              <label className="block text-muted-foreground mb-1">Format</label>
              <Select value={format} onValueChange={(val) => setFormat(val as typeof format)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Format</SelectLabel>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="webp">WEBP</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                    <SelectItem value="jpeg">JPG2000</SelectItem>
                    <SelectItem value="gif">GIF</SelectItem>
                    <SelectItem value="avif">AVIF</SelectItem>
                    <SelectItem value="tiff">TIFF</SelectItem>
                    <SelectItem value="bmp">BMP</SelectItem>
                    <SelectItem value="heic">HEIC</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* DPI & Quality */}
          <div className="flex flex-row max-md:flex-col max-md:gap-1 gap-24 items-center justify-between w-full">
            <div className="mb-4 flex-1 max-md:w-full">
              <label className="block text-muted-foreground mb-1">Resolution (DPI)</label>
              <Slider
                min={30}
                max={1200}
                step={1}
                value={[dpi]}
                onValueChange={(val) => setDpi(val[0])}
              />
              <div className="text-xs text-muted-foreground mt-1 flex justify-between items-center">
                <span>30 - 1,200</span>
                <EditableNumber
                  value={dpi}
                  min={30}
                  max={1200}
                  onChange={(val) => setDpi(val)}
                  ending="DPI"
                />
              </div>
            </div>

            <div
              className={`mb-4 flex-1 max-md:w-full ${
                format === 'png' || format === 'gif' || format === 'bmp' ? 'hidden' : 'block'
              }`}
            >
              <label className="block text-muted-foreground mb-1">Quality (%)</label>
              <Slider
                min={1}
                max={200}
                step={1}
                value={[quality]}
                onValueChange={(val) => setQuality(val[0])}
              />
              <div className="text-xs text-muted-foreground mt-1 flex justify-between items-center">
                <span>1 - 200</span>
                <EditableNumber
                  value={quality}
                  min={1}
                  max={200}
                  onChange={(val) => setQuality(val)}
                  ending="%"
                />
              </div>
            </div>
          </div>

          {/* Background */}
          <div className="flex items-center gap-6 mt-4">
            <span className="text-muted-foreground">Background:</span>
            {['white', 'black'].map((color) => (
              <label key={color} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="background"
                  value={color}
                  checked={background === color}
                  onChange={() => setBackground(color as 'white' | 'black')}
                />
                <span
                  className={`w-5 h-5 rounded-full border border-border block ${
                    color === 'black' ? 'bg-black' : 'bg-white'
                  }`}
                />
                <span className="text-foreground">
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormatForm;
