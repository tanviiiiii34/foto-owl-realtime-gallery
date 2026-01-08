import ImageModal from "./ImageModal";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchImages } from "../../api/unsplash";

const queryClient = new QueryClient();

function GalleryInner() {
  const [selectedImage, setSelectedImage] = useState(null);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["images"],
    queryFn: () => fetchImages(1),
  });

  if (isLoading) return <p className="p-4">Loading images…</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading images</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Gallery</h1>

      <div className="grid grid-cols-3 gap-4">
        {data.map((img) => (
          <img
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description || "Unsplash"}
            className="h-40 w-full object-cover rounded cursor-pointer"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}


export default function Gallery() {
  return (
    <QueryClientProvider client={queryClient}>
      <GalleryInner />
    </QueryClientProvider>
  );
}
