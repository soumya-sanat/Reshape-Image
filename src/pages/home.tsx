import { Card } from "@/components/ui/card";
import UploadFile from "@/components/common/upload-file";

// Create some dummy initial files
// const initialFiles = [
//   {
//     name: "intro.zip",
//     size: 252873,
//     type: "application/zip",
//     url: "https://example.com/intro.zip",
//     id: "intro.zip-1744638436563-8u5xuls",
//   },
//   {
//     name: "image-01.jpg",
//     size: 1528737,
//     type: "image/jpeg",
//     url: "https://picsum.photos/1000/800?grayscale&random=1",
//     id: "image-01-123456789",
//   },
//   {
//     name: "audio.mp3",
//     size: 1528737,
//     type: "audio/mpeg",
//     url: "https://example.com/audio.mp3",
//     id: "audio-123456789",
//   },
// ];

const Home = () => {
  // const maxSizeMB = 5;
  // const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  // const maxFiles = 6;
  return (
    <div className="flex h-full flex-col gap-2 overflow-x-auto rounded-xl p-2">
      <Card className="mx-auto w-full max-w-[1200px] rounded-md p-6">
        <UploadFile
          maxFiles={1}
          maxSize={10 * 1024 * 1024} // 10MB
          accept="image/*"
          multiple={false}
        />
      </Card>
    </div>
  );
};

export default Home;
