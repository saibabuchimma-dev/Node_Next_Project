import { pool } from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";

//CREATE TASK
export const createTask = async ( req: AuthRequest, res: Response) => {
    const {title} = req.body;
    const userId = req.user.id;

    const result = await pool.query(
        "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *", [title, userId]
    );

    res.json(result.rows[0]);
}

//GET TASK
export const getTasks = async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;

    const result = await pool.query(
        "SELECT * FROM tasks WHERE user_id = $1", [userId]
    );

    res.json(result.rows);
}