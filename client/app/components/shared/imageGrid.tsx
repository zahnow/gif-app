import { HStack, VStack } from "@chakra-ui/react";
import ImageGridItem from "./imageGridItem";

type Gif = {
  id: string;
  title: string;
  url: string;
  images: {
    original: {
      url: string;
    };
    fixed_width: {
      url: string;
      height: number;
    };
  };
};

export default function ImageGrid({ gifs }: { gifs: Gif[] }) {
  return (
    <HStack gap={4} alignItems={"flex-start"} justifyContent={"center"}>
      <VStack gap={4}>
        {gifs.slice(0, 5).map((gif: Gif) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
      <VStack gap={6}>
        {gifs.slice(5, 10).map((gif: Gif) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
      <VStack gap={6}>
        {gifs.slice(10, 15).map((gif: Gif) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
      <VStack gap={6}>
        {gifs.slice(15, 20).map((gif: Gif) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
      <VStack gap={6}>
        {gifs.slice(20, 25).map((gif: Gif) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
      <VStack gap={6}>
        {gifs.slice(25).map((gif: Gif) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
    </HStack>
  );
}
