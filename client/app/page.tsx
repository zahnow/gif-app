import { Heading, Text, Grid, Card, Image } from "@chakra-ui/react";

export default async function Home() {
  const data = await fetch(`http://localhost:3001/api/gifs`);
  const json = await data.json();

  return (
    <>
      <Heading size={"lg"}>Trending GIFs</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {json.data?.map((gif: any) => (
          <Card.Root overflow={"hidden"} key={gif.id}>
            <Image src={gif.images.fixed_width.url} alt={gif.title} />
            <Card.Body>
              <Text>{gif.title}</Text>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </>
  );
}
