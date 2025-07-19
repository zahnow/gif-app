"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Center, Heading, Spinner } from "@chakra-ui/react";

// TODO: Add abbreviated GIF data type
type Gif = {
  id: string;
  title: string;
  images: {
    original: {
      url: string;
      width?: number;
      height?: number;
    };
  };
};

export default function GifDetails({ id }: { id: string }) {
  const [gif, setGif] = useState<Gif | null>(null);

  useEffect(() => {
    const fetchGif = async () => {
      const response = await fetch(`http://localhost:3001/api/gifs/${id}`, {
        credentials: "include",
      });
      const data = await response.json();
      setGif(data);
    };

    fetchGif();
  }, [id]);

  return (
    <div>
      {gif ? (
        <>
          <Heading>{gif.title}</Heading>
          <Center>
            <Image
              src={gif.images?.original?.url}
              alt={gif.title}
              width={gif.images?.original?.width || 500}
              height={gif.images?.original?.height || 500}
              unoptimized
            />
          </Center>
        </>
      ) : (
        <Center>
          <Spinner size="xl" />
        </Center>
      )}
    </div>
  );
}
