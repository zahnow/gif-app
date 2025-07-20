import { HStack, VStack, Heading, Text, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import Account from "./account";

export default function Header() {
  return (
    <HStack paddingBottom={5}>
      <VStack alignItems={"start"}>
        <Heading size={"2xl"} color={"orange.500"}>
          <Link href="/">GIF Finder</Link>
        </Heading>
        <Text>Explore trending GIFs, search for your favorites, and more!</Text>
      </VStack>
      <Spacer />
      <Account />
    </HStack>
  );
}
