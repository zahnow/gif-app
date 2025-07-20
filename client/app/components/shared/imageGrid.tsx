"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageGridItem from "./imageGridItem";

type Gif = {
  id: string;
  title: string;
  url: string;
  images: {
    original: {
      url: string;
      height: number;
      width: number;
    };
  };
};

export default function ImageGrid({ gifs }: { gifs: Gif[] }) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 480: 1, 768: 3, 1024: 4, 1280: 5, 1536: 6 }}
    >
      <Masonry>
        {gifs.map((gif: Gif) => (
          <ImageGridItem key={gif.id} gif={gif} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
