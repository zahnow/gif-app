"use client"; // TODO: Could switch to serverside fetching

import { VStack, Text, HStack } from "@chakra-ui/react";
import CommentListItem from "./commentListItem";

type Comment = {
  comment: {
    id: string;
    userId: string;
    comment: string;
    createdAt: string;
  };
  user: string;
};

export default function CommentList({
  comments,
  fetchComments,
}: {
  comments: Comment[];
  fetchComments: () => void;
}) {
  return (
    <HStack justifyContent={"center"}>
      <VStack w={"60ch"} gap={4}>
        {comments.length === 0 ? (
          <Text textAlign="center">No comments yet.</Text>
        ) : (
          comments.map((comment) => (
            <CommentListItem
              key={comment.comment.id}
              comment={comment}
              fetchComments={fetchComments}
            />
          ))
        )}
      </VStack>
    </HStack>
  );
}
