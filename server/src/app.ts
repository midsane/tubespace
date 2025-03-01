import express from "express";
import client from "./db/db";
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/createuser", async (req, res) => {
  const { email, password, username } = req.body;
  const userCreated = await client.youtuber.create({
    data: {
      email,
      password,
      username,
    },
  });

  res.json({ message: "User created successfully", user: userCreated });
});

export default app;
