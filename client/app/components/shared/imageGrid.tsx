import { HStack, VStack } from "@chakra-ui/react";
import ImageGridItem from "./imageGridItem";

// TODO: replace with actual GIF data type
export default function ImageGrid({ gifs }: { gifs: any[] }) {
  return (
    <HStack gap={4} alignItems={"flex-start"} justifyContent={"center"}>
      <VStack gap={4}>
        {gifs.slice(0, 5).map((gif: any) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
      <VStack gap={6}>
        {gifs.slice(5, 10).map((gif: any) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
      <VStack gap={6}>
        {gifs.slice(10, 15).map((gif: any) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
      <VStack gap={6}>
        {gifs.slice(15, 20).map((gif: any) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
      <VStack gap={6}>
        {gifs.slice(20, 25).map((gif: any) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
      <VStack gap={6}>
        {gifs.slice(25).map((gif: any) => (
          <ImageGridItem key={gif.id} {...gif} />
        ))}
      </VStack>
    </HStack>
  );
}
