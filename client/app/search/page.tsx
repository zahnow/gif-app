import { Heading } from "@chakra-ui/react";
import SearchResults from "./components/searchResults";
import Search from "../components/shared/search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string | null };
}) {
  const { query } = await searchParams;

  return (
    <>
      <Heading size={"lg"}>Search GIFs</Heading>
      <Search />
      <Heading>Results for {query}</Heading>
      <SearchResults query={query} />
    </>
  );
}
