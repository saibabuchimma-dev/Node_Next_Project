import { Request, Response } from "express";
import { pool } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register User
export const registerUser = async (req: Request, res: Response) => {
  const { name, age, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (name, email, age, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, age, hashedPassword],
  );

  res.json(result.rows[0]);
};

//Login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return res.status(400).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user.rows[0].id }, "secretkey", {
    expiresIn: "1h",
  });

  res.json({ token });
};
