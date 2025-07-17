import { Router } from "express";

const ratingRouter: Router = Router();

ratingRouter.get("/:id", (req, res) => {
  const ratingId = req.params.id;
  res.send(
    `Hello from the rating router. You requested rating ID: ${ratingId}`,
  );
});

ratingRouter.get("/average/:gifId", (req, res) => {
  const gifId = req.params.gifId;
  // TODO: Add db logic
  res.send(`Average rating for GIF ID ${gifId} is 4.5`); // Example response
});

ratingRouter.post("/", (req, res) => {
  const { gifId, rating } = req.body;
  if (!gifId || typeof rating !== "number") {
    return res.status(400).send("gifId and rating are required.");
  }

  res.send(`Rating of ${rating} for GIF ID ${gifId} has been saved.`);
});

ratingRouter.put("/:id", (req, res) => {
  const ratingId = req.params.id;
  const { rating, userId } = req.body;
  if (!userId) {
    return res.status(400).send("User ID is required for updating the rating.");
  }
  if (typeof rating !== "number") {
    return res.status(400).send("Rating must be a number.");
  }
  // TODO: Add db logic
  res.send(`Rating ID ${ratingId} has been updated to ${rating}.`);
});

ratingRouter.delete("/:id", (req, res) => {
  const ratingId = req.params.id;
  const userId = req.body.userId; // Assuming userId is sent in the body for authorization
  if (!userId) {
    return res.status(400).send("User ID is required for deletion.");
  }

  // TODO: Add db logic
  res.send(`Rating ID ${ratingId} has been deleted.`);
});

export default ratingRouter;
