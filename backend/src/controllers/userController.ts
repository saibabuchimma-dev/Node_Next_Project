import { Request, Response } from "express";
import { pool } from "../config/db";

export const getUser = async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  const result = await pool.query(
    "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
    [name, email, age],
  );
  res.json(result.rows[0]);
};
