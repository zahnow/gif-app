import { Heading } from "@chakra-ui/react";
import TrendingGrid from "./components/trendingGrid";
import Search from "./components/shared/search";

export default async function Home() {
  return (
    <>
      <Search />
      <Heading size={"lg"}>Trending GIFs</Heading>
      <TrendingGrid />
    </>
  );
}
