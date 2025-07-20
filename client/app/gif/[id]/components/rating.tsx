"use client";

import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  CloseButton,
  RatingGroup,
  Heading,
} from "@chakra-ui/react";

export default function StarRating({ gifId }: { gifId: string }) {
  const [rating, setRating] = useState(0);

  const updateRating = async (event: { value: number }) => {
    const value = event.value;
    setRating(value);
    await fetch(`http://localhost:3001/api/ratings/${gifId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: event.value }),
    });
  };

  const deleteRating = async () => {
    setRating(0);
    await fetch(`http://localhost:3001/api/ratings/${gifId}`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  useEffect(() => {
    const fetchRating = async () => {
      const response = await fetch(
        `http://localhost:3001/api/ratings/${gifId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setRating(data.rating || 0);
    };

    fetchRating();
  }, [gifId]);

  return (
    <Box py={4}>
      <Heading as="h2" size="lg" textAlign="center">
        Your Rating
      </Heading>
      <HStack justifyContent={"center"}>
        <RatingGroup.Root
          py={3}
          count={5}
          size={"lg"}
          value={rating}
          onValueChange={(event) => updateRating(event)}
        >
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
        <CloseButton onClick={deleteRating} disabled={rating === 0} />
      </HStack>
    </Box>
  );
}
