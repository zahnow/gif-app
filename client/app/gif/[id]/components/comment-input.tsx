"use client";
import { useState } from "react";
import { Box, Input, Button, VStack } from "@chakra-ui/react";

export default function CommentInput() {
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (comment.trim()) {
      // post comment
      setComment("");
    }
  };

  return (
    <Box w="100%">
      <VStack gap={2} align="stretch">
        <Input
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddComment}>
          Post Comment
        </Button>
      </VStack>
    </Box>
  );
}
