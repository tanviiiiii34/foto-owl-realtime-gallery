import { useState } from "react";
import ImageModal from "./ImageModal";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { fetchImages } from "../../api/unsplash";

const queryClient = new QueryClient();

function GalleryInner() {
  const [selectedImage, setSelectedImage] = useState(null);

  // what user types
  const [inputValue, setInputValue] = useState("nature");

  // actual search query used for API
  const [query, setQuery] = useState("nature");

  const {
    data: images = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["images", query],
    queryFn: () => fetchImages(query),
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const trimmed = inputValue.trim();
      setQuery(trimmed.length ? trimmed : "nature");
    }
  };

  /* ---------------- Skeleton Loader ---------------- */
  if (isLoading) {
    return (
      <div className="p-4 bg-gray-50 min-h-screen">
        <h1 className="text-lg font-semibold mb-3 tracking-wide">
          Image Gallery
        </h1>

        <input
          disabled
          className="w-full mb-4 px-3 py-2 border rounded bg-gray-100"
          placeholder="Loading images..."
        />

        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-40 w-full rounded bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="p-4 text-red-500">
        Something went wrong while loading images.
      </p>
    );
  }

  /* ---------------- Main UI ---------------- */
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-lg font-semibold mb-3 tracking-wide">
        Image Gallery
      </h1>

      {/* Search Bar */}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Search images and press Enter"
        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
      />

      {/* Empty State */}
      {images.length === 0 && (
        <p className="text-gray-500 text-sm">
          No images found. Try another search.
        </p>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="cursor-pointer overflow-hidden rounded transition-transform duration-200 hover:scale-105"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.urls.small}
              alt={img.alt_description || "Unsplash image"}
              className="h-40 w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

/* ---------------- Provider Wrapper ---------------- */

export default function Gallery() {
  return (
    <QueryClientProvider client={queryClient}>
      <GalleryInner />
    </QueryClientProvider>
  );
}
