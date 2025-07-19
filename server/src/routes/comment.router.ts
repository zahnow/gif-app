import { Router } from "express";
import { eq, and, sql, isNull } from "drizzle-orm";
import { db } from "../db/db";
import { commentsTable, user } from "../db/schema";
import { requireSession } from "../middleware/requireSession";

const commentRouter: Router = Router();

commentRouter.get("/:id", requireSession, async (req, res) => {
  const gifId = req.params.id;

  const comments = await db
    .select({ comment: commentsTable, user: user.name })
    .from(commentsTable)
    .leftJoin(user, eq(commentsTable.userId, user.id))
    .where(
      and(eq(commentsTable.gifId, gifId), isNull(commentsTable.deletedAt))
    );

  if (!comments) {
    return res.status(200).send([]);
  }

  res.send(comments);
});

commentRouter.post("/", requireSession, async (req, res) => {
  const { gifId, comment } = req.body;
  const userId = req.session?.user.id;
  if (!gifId || !comment) {
    return res.status(400).send("gifId, and comment are required.");
  }
  if (!userId) {
    // This doesn't actually happen due to the requireSession middleware.
    // Doing it to appease TypeScript.
    return res
      .status(401)
      .send("User ID is required for updating the comment.");
  }

  const newComment: typeof commentsTable.$inferInsert = {
    gifId,
    userId,
    comment,
  };

  await db.insert(commentsTable).values(newComment);
  res.status(201).send("Comment added successfully.");
});

commentRouter.put("/:id", requireSession, async (req, res) => {
  const commentId = Number(req.params.id);
  const { comment } = req.body;
  const userId = req.session?.user.id;

  if (!comment) {
    return res.status(400).send("Comment text is required for updating.");
  }
  if (!userId) {
    // This doesn't actually happen due to the requireSession middleware.
    // Doing it to appease TypeScript.
    return res
      .status(401)
      .send("User ID is required for updating the comment.");
  }

  const result = await db
    .update(commentsTable)
    .set({ comment, updatedAt: sql`(current_timestamp)` })
    .where(
      and(eq(commentsTable.id, commentId), eq(commentsTable.userId, userId))
    );

  res.sendStatus(200);
});

commentRouter.delete("/:id", requireSession, async (req, res) => {
  const commentId = Number(req.params.id);
  const userId = req.session?.user.id;
  if (!userId) {
    return res.status(400).send("User ID is required for deletion.");
  }

  const result = await db
    .update(commentsTable)
    .set({ deletedAt: sql`(current_timestamp)` })
    .where(
      and(eq(commentsTable.id, commentId), eq(commentsTable.userId, userId))
    );

  res.send(`Comment with ID ${commentId} deleted successfully.`);
});

export default commentRouter;
