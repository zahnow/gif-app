import Image from "next/image";
import { Center, Heading } from "@chakra-ui/react";

// TODO: Move types to shared file
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

export default async function GifDetails({ id }: { id: string }) {
  let gif: Gif | null = null;
  const response = await fetch(`http://localhost:3001/api/gifs/${id}`, {
    headers: {
      authorization: `Bearer ${process.env.SERVER_SECRET}`,
    },
    credentials: "include",
  });
  if (!response.ok) {
    console.error("Failed to fetch GIF details:", response.statusText);
  } else {
    gif = await response.json();
  }

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
          <Heading>GIF not found</Heading>
        </Center>
      )}
    </div>
  );
}
