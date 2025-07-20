// "use client";

import ImageGrid from "./shared/imageGrid";

export default async function TrendingGrid() {
  let gifs = { data: [] };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs`, {
    headers: {
      authorization: `Bearer ${process.env.SERVER_SECRET}`,
    },
  });
  if (!response.ok) {
    console.error("Failed to fetch trending GIFs:", response.statusText);
  } else {
    gifs = await response.json();
  }

  return <ImageGrid gifs={gifs.data} />;
}
