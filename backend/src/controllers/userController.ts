import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
    res.json({ message: "User fetched successfully !" });
}

export const createUser = (req: Request, res: Response) => {
    const {name, age} = req.body;
    res.json({
        message: `User ${name} is ${age} years old`,
    });
};