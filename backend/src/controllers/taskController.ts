import { pool } from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";

//CREATE TASK
export const createTask = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;
  const userId = req.user.id;

  const result = await pool.query(
    "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *",
    [title, userId],
  );

  res.json(result.rows[0]);
};

//GET TASK
export const getTasks = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;

  const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
    userId,
  ]);

  res.json(result.rows);
};

//UPDATE TASK
export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const userId = req.user.id;

  if(!title) {
    return res.status(400).json({ message: "Title is required" })
  }

  const result = await pool.query(
    "UPDATE tasks SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [title, id, userId],
  );

  res.json(result.rows[0]);
};

//DELETE TASK
export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  const result = await pool.query(
    "DELETE FROM  tasks WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  if(result.rowCount === 0) {
    return res.status(404).json({ message: "Task not found" })
  };

  res.json({ message: "Task deleted" });
};

//TASK COMPLETED
export const toggleTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  const result = await pool.query(
    "UPDATE tasks SET completed  = NOT completed WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId],
  );

  res.json(result.rows[0]);
};
