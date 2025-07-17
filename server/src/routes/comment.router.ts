import { Router } from "express";
import { db } from "../db/db";
import { commentsTable } from "../db/schema";
import { testTable } from "../db/schema";

const commentRouter: Router = Router();

commentRouter.get("/:id", (req, res) => {
  const commentId = req.params.id;
  // TODO: Add db logic
  res.send(
    `Hello from the comment router. You requested comment ID: ${commentId}`,
  );
});

commentRouter.post("/", async (req, res) => {
  const { gifId, userId, comment } = req.body;
  if (!gifId || !userId || !comment) {
    return res.status(400).send("gifId, userId, and comment are required.");
  }

  const newComment: typeof commentsTable.$inferInsert = {
    gifId,
    userId,
    comment,
  };

  await db.insert(commentsTable).values(newComment);
  res.status(201).send("Comment added successfully.");
});

// commentRouter.post("/", async (req, res) => {
//   const { name, age, email } = req.body;
//   if (!name || !age || !email) {
//     return res.status(400).send("Name, age, and email are required.");
//   }
//   const testUser: typeof testTable.$inferInsert = {
//   name, age, email
// }
// await db.insert(testTable).values(testUser);
// res.status(201).send("Test user added successfully.");
// });

commentRouter.put("/:id", (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).send("Comment text is required for updating.");
  }
  // TODO: Add db logic to update the comment
  res.send(`Comment with ID ${commentId} updated successfully.`);
});

commentRouter.delete("/:id", (req, res) => {
  const commentId = req.params.id;
  const userId = req.body.userId; // Assuming userId is sent in the body for authorization
  if (!userId) {
    return res.status(400).send("User ID is required for deletion.");
  }
  // TODO: Add db logic to delete the comment
  res.send(`Comment with ID ${commentId} deleted successfully.`);
});

export default commentRouter;
