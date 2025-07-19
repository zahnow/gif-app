import { Router } from "express";
import { requireSession } from "../middleware/requireSession";

const gifRouter: Router = Router();

gifRouter.get("/", requireSession, async (req, res) => {
  const gifQuery = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=30&offset=0&rating=g&bundle=messaging_non_clips`
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
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=30&offset=0&rating=g&bundle=messaging_non_clips`
  );
  const searchResults = await searchQuery.json();
  res.send(searchResults);
});

gifRouter.get("/:id", requireSession, async (req, res) => {
  const gifId = req.params.id;
  const gifQuery = await fetch(
    `https://api.giphy.com/v1/gifs/${gifId}?api_key=${process.env.GIPHY_API_KEY}`
  );
  const gif = await gifQuery.json();
  if (gif.data) {
    res.send(gif.data);
  } else {
    res.status(404).send("GIF not found.");
  }
});

gifRouter.get("/autocomplete", requireSession, async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send("Query parameter 'q' is required.");
  }
  const acQuery = await fetch(
    `https://api.giphy.com/v1/gifs/search/tags?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=30&offset=0`
  );
  const acResults = await acQuery.json();
  res.send(acResults);
});

export default gifRouter;
