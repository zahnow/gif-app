"use client";

import { useState } from "react";
import { Input, Button, VStack, HStack } from "@chakra-ui/react";

export default function CommentInput({ gifId }: { gifId: string }) {
  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    if (comment.trim()) {
      const response = await fetch(`http://localhost:3001/api/comments/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, gifId }),
      });
      if (!response.ok) {
        console.error("Failed to add comment:", response.statusText);
      } else {
        setComment("");
      }
    }
  };

  return (
    <HStack justifyContent={"center"} pt={4} pb={8}>
      <VStack w={"60ch"} gap={2}>
        <Input
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleAddComment}>Post Comment</Button>
      </VStack>
    </HStack>
  );
}
