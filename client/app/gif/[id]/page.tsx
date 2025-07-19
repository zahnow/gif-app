import StarRating from "./components/rating";
import CommentInput from "./components/commentInput";
import CommentList from "./components/commentList";
import GifDetails from "./components/gifDetails";

export default async function GifDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <>
      <GifDetails id={id} />
      <StarRating gifId={id} />
      <CommentInput gifId={id} />
      <CommentList gifId={id} />
    </>
  );
}
