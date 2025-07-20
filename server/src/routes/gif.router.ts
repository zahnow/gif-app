import { Router } from "express";
import { requireSession } from "../middleware/requireSession";

const gifRouter: Router = Router();

gifRouter.get("/", async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.SERVER_SECRET}`) {
    return res.status(401).send("Unauthorized");
  }

  const gifQuery = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=40&offset=0&rating=g&bundle=messaging_non_clips`
  );
  const gifs = await gifQuery.json();
  res.send(gifs);
});

gifRouter.get("/search", requireSession, async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send("Query parameter 'q' is required.");
  }
  const searchQuery = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=40&offset=0&rating=g&bundle=messaging_non_clips`
  );
  const searchResults = await searchQuery.json();
  res.send(searchResults);
});

gifRouter.get("/:id", async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.SERVER_SECRET}`) {
    return res.sendStatus(401);
  }

  const gifId = req.params.id;
  if (!gifId) {
    return res.status(400).send("GIF ID is required.");
  }

  const gifQuery = await fetch(
    `https://api.giphy.com/v1/gifs/${gifId}?api_key=${process.env.GIPHY_API_KEY}`
  );
  const gif = await gifQuery.json();
  if (gif.data) {
    res.send(gif.data);
  } else {
    res.sendStatus(404);
  }
});

export default gifRouter;
