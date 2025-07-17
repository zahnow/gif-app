import express from "express";
import "dotenv/config";
import gifRouter from "./routes/gif.router";
import ratingRouter from "./routes/rating.router";
import commentRouter from "./routes/comment.router";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

app.use("/api/gifs", gifRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/comments", commentRouter);

app.listen(port, () => {
  console.log(`Express is running at http://localhost:${port}`);
});
