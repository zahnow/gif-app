"use client";

import { useEffect, useState } from "react";
import ImageGrid from "./shared/imageGrid";

export default function TrendingGrid() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const fetchGifs = async () => {
      const response = await fetch(`http://localhost:3001/api/gifs`, {
        credentials: "include",
      });
      const data = await response.json();
      setGifs(data.data);
    };
    fetchGifs();
  }, []);

  return <ImageGrid gifs={gifs} />;
}
