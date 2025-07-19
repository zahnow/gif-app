"use client";

import { useEffect, useState } from "react";
import { HStack, Button, RatingGroup } from "@chakra-ui/react";

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
    <>
      <HStack py={4} justifyContent={"center"}>
        <RatingGroup.Root
          count={5}
          size={"lg"}
          value={rating}
          onValueChange={(event) => updateRating(event)}
        >
          <RatingGroup.Label pr={2}>Rating</RatingGroup.Label>
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
        {rating > 0 && <Button onClick={deleteRating}>Delete Rating</Button>}
      </HStack>
    </>
  );
}
