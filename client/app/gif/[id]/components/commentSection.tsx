"use client";

import { useEffect, useState } from "react";
import CommentInput from "./commentInput";
import CommentList from "./commentList";
import Comment from "@/types/comment";
import { Heading } from "@chakra-ui/react";

export default function CommentSection({ gifId }: { gifId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  function fetchComments() {
    return fetch(`http://localhost:3001/api/comments/${gifId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        return response.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
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
