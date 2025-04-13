import express, { Request, Response } from "express";
import User from "./db/db";
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

app.post("/user", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(200).json({ message: "User Saved to DB!" });
  } catch (error) {
    res.status(500).json({ message: "Unable to save user!", error });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Unable to get users!", error });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
