import Image from "next/image";
import { Box, Center, Heading } from "@chakra-ui/react";
import Gif from "@/types/gif";

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
    <Box py={8}>
      {gif ? (
        <>
          <Heading textAlign="center" size={"4xl"} fontWeight={"bold"} pb={3}>
            {gif.title}
          </Heading>
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
    </Box>
  );
}
