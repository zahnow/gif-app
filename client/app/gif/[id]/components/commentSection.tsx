"use client";

import { useEffect, useState } from "react";
import CommentInput from "./commentInput";
import CommentList from "./commentList";

type Comment = {
  comment: {
    id: string;
    userId: string;
    author: {
      name: string;
      avatarUrl?: string;
    };
    comment: string;
    createdAt: string;
  };
  user: string;
};

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
      <CommentInput gifId={gifId} fetchComments={fetchComments} />
      <CommentList comments={comments} fetchComments={fetchComments} />
    </>
  );
}
