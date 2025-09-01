// Converts between pixel, percent, inch, centimeter
export function convertDimension(
  value: number,
  fromUnit: 'pixel' | 'percent' | 'inch' | 'centimeter',
  toUnit: 'pixel' | 'percent' | 'inch' | 'centimeter',
  originalPixel: number,
  dpi: number
): number {
  let px: number;

  switch (fromUnit) {
    case 'pixel':
      px = value;
      break;
    case 'percent':
      px = (value / 100) * originalPixel;
      break;
    case 'inch':
      px = value * dpi;
      break;
    case 'centimeter':
      px = (value / 2.54) * dpi;
      break;
    default:
      px = value;
  }

  switch (toUnit) {
    case 'pixel':
      return px;
    case 'percent':
      return (px / originalPixel) * 100;
    case 'inch':
      return px / dpi;
    case 'centimeter':
      return (px / dpi) * 2.54;
    default:
      return px;
  }
}
import toast from 'react-hot-toast';

export const downloadImage = async (imageUrl: string, fileName: string) => {
  try {
    const response = await fetch(imageUrl, {
      mode: 'cors' // Ensures cross-origin download support
    });

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Create a hidden <a> tag to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    // console.error("Download failed:", error);
    toast(`Download failed ${error}`);
  }
};
