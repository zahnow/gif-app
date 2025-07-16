import { Express, Router } from "express";

const commentRouter: Router = Router();

commentRouter.get("/:id", (req, res) => {
  const commentId = req.params.id;
  // TODO: Add db logic
  res.send(`Hello from the comment router. You requested comment ID: ${commentId}`);
});

export default commentRouter;