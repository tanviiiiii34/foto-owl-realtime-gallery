export const fetchImages = async (query) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }

  const data = await res.json();
  return data.results;
};
