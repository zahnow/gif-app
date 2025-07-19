"use client"; // TODO: Could switch to serverside fetching

import React from "react";
import { VStack, Text, HStack } from "@chakra-ui/react";
import CommentListItem from "./commentListItem";

type Comment = {
  comment: {
    id: string;
    author: {
      name: string;
      avatarUrl?: string;
    };
    comment: string;
    createdAt: string;
  };
  user: string;
};

export default function CommentList({ gifId }: { gifId: string }) {
  const [comments, setComments] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `http://localhost:3001/api/comments/${gifId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error("Failed to fetch comments:", response.statusText);
      }
    };

    fetchComments();
  }, []);

  return (
    <HStack justifyContent={"center"}>
      <VStack w={"60ch"} gap={4}>
        {comments.length === 0 ? (
          <Text color="gray.500" textAlign="center">
            No comments yet.
          </Text>
        ) : (
          comments.map((comment) => (
            <CommentListItem key={comment.comment.id} comment={comment} />
          ))
        )}
      </VStack>
    </HStack>
  );
}
