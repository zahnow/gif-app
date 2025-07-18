"use client"; // TODO: Could switch to serverside fetching

import React from "react";
import { Box, VStack, Text, Avatar, HStack } from "@chakra-ui/react";

type Comment = {
  id: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
};

export default function CommentList() {
  const [comments, setComments] = React.useState<Comment[]>([]);
  return (
    <VStack align="stretch" gap={4}>
      {comments.length === 0 ? (
        <Text color="gray.500" textAlign="center">
          No comments yet.
        </Text>
      ) : (
        comments.map((comment) => (
          <Box
            key={comment.id}
            p={4}
            bg="gray.50"
            borderRadius="md"
            boxShadow="sm"
          >
            <HStack gap={3} align="start">
              {/* // TODO: Add Avatar */}
              <Box>
                <Text fontWeight="bold">{comment.author.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {new Date(comment.createdAt).toLocaleString()}
                </Text>
                <Text mt={2}>{comment.content}</Text>
              </Box>
            </HStack>
          </Box>
        ))
      )}
    </VStack>
  );
}
