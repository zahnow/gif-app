"use client";

import { useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?query=${searchValue}`);
  };

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <Box maxW="60ch" mx="auto" mt={4}>
        <Input
          size={"2xl"}
          placeholder="Search GIFs..."
          borderColor="gray.solid"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Box>
    </form>
  );
}
