import { Router } from "express";
import { db } from "../db/db";
import { ratingsTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { requireSession } from "../middleware/requireSession";

const ratingRouter: Router = Router();

ratingRouter.get("/:id", requireSession, async (req, res) => {
  const gifId = req.params.id;
  const userId = req.session.user.id;

  const result = await db
    .select()
    .from(ratingsTable)
    .where(and(eq(ratingsTable.gifId, gifId), eq(ratingsTable.userId, userId)))
    .limit(1);

  if (result.length > 0) {
    res.send(result[0]);
  } else {
    res.send(0);
  }
});

ratingRouter.put("/:id", requireSession, async (req, res) => {
  const gifId = req.params.id;
  const { rating } = req.body;
  const userId = req.session.user.id;

  if (typeof rating !== "number") {
    return res.status(400).send("Rating must be a number.");
  }

  const newRating = {
    gifId,
    userId,
    rating,
  };

  const result = await db
    .insert(ratingsTable)
    .values(newRating)
    .onConflictDoUpdate({
      target: [ratingsTable.gifId, ratingsTable.userId],
      set: { rating: newRating.rating },
    });
  res.sendStatus(200);
});

ratingRouter.delete("/:id", requireSession, async (req, res) => {
  const gifId = req.params.id;
  const userId = req.session.user.id;

  const result = await db
    .delete(ratingsTable)
    .where(and(eq(ratingsTable.gifId, gifId), eq(ratingsTable.userId, userId)));

  res.sendStatus(204);
});

export default ratingRouter;
