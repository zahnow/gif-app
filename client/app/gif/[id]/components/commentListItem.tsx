"use client";

import { useState } from "react";
import { authClient } from "@/components/auth/auth-client";
import { Box, HStack, Spacer, VStack, Text, Input } from "@chakra-ui/react";

type Comment = {
  comment: {
    id: string;
    userId: string;
    comment: string;
    createdAt: string;
  };
  user: string;
};

export default function CommentListItem({ comment }: { comment: Comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment.comment);
  const session = authClient.useSession();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditedComment(comment.comment.comment);
    }
  };

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:3001/api/comments/${comment.comment.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.ok) {
      // TODO: Optionally, you can refetch the comments or update the state to remove the deleted
      // comment without a full refetch.
    } else {
      console.error("Failed to delete comment:", response.statusText);
    }
  };

  const handleEdit = async () => {
    if (editedComment.trim() === "") {
      return;
    }
    const response = await fetch(
      `http://localhost:3001/api/comments/${comment.comment.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: editedComment }),
      }
    );
    if (response.ok) {
      setIsEditing(false);
      // Optionally, you can refetch the comments or update the state to reflect the edited
      // comment without a full refetch.
    } else {
      console.error("Failed to update comment:", response.statusText);
    }
  };

  return (
    <Box
      key={comment.comment.id}
      p={4}
      borderRadius="md"
      borderWidth="1px"
      width={"100%"}
    >
      <VStack gap={2} alignItems="flex-start">
        <HStack
          width="100%"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Text fontWeight="bold">{comment.user}</Text>
            <Text fontSize="xs">
              {new Date(comment.comment.createdAt).toLocaleString()}
            </Text>
          </Box>
          <Spacer />
        </HStack>
        {isEditing ? (
          <Input
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEdit();
              }
            }}
          />
        ) : (
          <Text mt={2}>{comment.comment.comment}</Text>
        )}
        <HStack width="100%" gap={4} justifyContent="flex-end">
          {session.data?.user.id === comment.comment.userId && (
            <>
              <Text
                cursor={"pointer"}
                fontSize={"xs"}
                onClick={handleEditToggle}
              >
                Edit
              </Text>
              <Text cursor={"pointer"} fontSize={"xs"} onClick={handleDelete}>
                Delete
              </Text>
            </>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}
