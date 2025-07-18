import React from "react";
import { Container, Heading } from "@chakra-ui/react";
import StarRating from "./components/rating";
import CommentInput from "./components/comment-input";
import CommentList from "./components/comment-list";

export default function GifDetailsPage({ params }: { params: { id: string } }) {
  //   const { id } = params;

  //   const gif = await fetch(`http://localhost:3001/api/gifs/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => data.data);

  return (
    <>
      <Heading as="h1">Testing {params.id}</Heading>
      {/* <h1>{gif.title}</h1>
      <img
      src={gif.url}
      alt={gif.title}
      style={{ maxWidth: "100%", height: "auto" }}
      /> */}
      <StarRating />
      <CommentInput />
      <CommentList />
    </>
  );
}
