import Link from "next/link";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

// TODO: replace with actual data type
export default function ImageGridItem(gif: {
  id: string;
  title: string;
  url: string;
  images: {
    fixed_width: {
      url: string;
      height: number;
    };
  };
}) {
  return (
    <Link href={`/gif/${gif.id}`} key={gif.id}>
      <Box
        borderRadius={"4"}
        overflow={"hidden"}
        transition={"transform 0.2s ease"}
        _hover={{ transform: "scale(1.05)" }}
      >
        <Image
          src={gif.images.fixed_width.url}
          width={200}
          height={gif.images.fixed_width.height}
          alt={gif.title}
          style={{ borderRadius: "8px" }}
          unoptimized
        />
      </Box>
    </Link>
  );
}
