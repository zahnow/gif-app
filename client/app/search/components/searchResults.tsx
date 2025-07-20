"use client";

import { useEffect, useState } from "react";
import ImageGrid from "@/app/components/shared/imageGrid";

export default function SearchResults({ query }: { query: string | null }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3001/api/gifs/search?q=${query}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      setResults(data.data);
    };

    fetchData();
  }, [query]);

  return <ImageGrid gifs={results} />;
}
