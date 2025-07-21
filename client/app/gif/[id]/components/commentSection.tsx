"use client";

import { useEffect, useState } from "react";
import CommentInput from "./commentInput";
import CommentList from "./commentList";
import Comment from "@/types/comment";
import { Heading } from "@chakra-ui/react";

export default function CommentSection({ gifId }: { gifId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  async function fetchComments() {
    try {
      const response = await fetch(
        `http://localhost:3001/api/comments/${gifId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [gifId]);

  return (
    <>
      <Heading as="h2" size="lg" mb={2} textAlign="center">
        Comments
      </Heading>
      <CommentInput gifId={gifId} fetchComments={fetchComments} />
      <CommentList comments={comments} fetchComments={fetchComments} />
    </>
  );
}
