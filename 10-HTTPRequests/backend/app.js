import fs from "node:fs/promises";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(express.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

const getData = async (path, delay = 0) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const data = await fs.readFile(path);
  return JSON.parse(data);
};

app.get("/places", async (req, res) => {
  const places = await getData("./data/places.json", 1500);
  res.status(200).json(places);
});

app.get("/user-places", async (req, res) => {
  const places = await getData("./data/user-places.json", 1000);
  res.status(200).json(places);
});

app.put("/user-places", async (req, res) => {
  const { placeId } = req.body;

  const places = await getData("./data/places.json");
  const place = places.find((place) => place.id === placeId);

  const userPlaces = await getData("./data/user-places.json");

  if (!userPlaces.some(({ id }) => id === place.id)) {
    userPlaces.unshift(place);
    await fs.writeFile("./data/user-places.json", JSON.stringify(userPlaces));
  }

  res.status(200).json(userPlaces);
});

app.delete("/user-places/:id", async (req, res) => {
  const placeId = req.params.id;
  const userPlaces = await getData("./data/user-places.json");

  const index = userPlaces.findIndex(({ id }) => id === placeId);

  if (index >= 0) {
    userPlaces.splice(index, 1);
    await fs.writeFile("./data/user-places.json", JSON.stringify(userPlaces));
  }

  res.status(200).json(userPlaces);
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return next();
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
