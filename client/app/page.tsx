import { Container, Heading, HStack, VStack, Text, Grid, Card, Image, Avatar, AvatarGroup, Spacer } from "@chakra-ui/react";

export default async function Home() {
  const data = await fetch(`http://localhost:3001/api/gifs`);
  const json = await data.json();

  return (
    <Container paddingTop={10}>
      <HStack paddingBottom={5}>
        <VStack alignItems={'start'}>
          <Heading size={'2xl'}>GIF Finder</Heading>
          <Text>Explore trending GIFs, search for your favorites, and more!</Text>
        </VStack>
        <Spacer />
        <AvatarGroup>
          <Avatar.Root>
            <Avatar.Fallback/>
            <Avatar.Image />
          </Avatar.Root>
        </AvatarGroup>
      </HStack>
      <Heading size={'lg'}>Trending GIFs</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {json.data?.map((gif: any) => (
          <Card.Root overflow={'hidden'}
            key={gif.id}
          >
              <Image src={gif.images.fixed_width.url} alt={gif.title} />
            <Card.Body>

              <Text>{gif.title}</Text>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </Container>
  );
}
