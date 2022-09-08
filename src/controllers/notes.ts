import { Request, Response, NextFunction } from "express";
import { getUsersNotes, updateUser } from "../services";
import { JWTPayload } from "../types";

const getNotesController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const query: any = req.query;
        const sort = query.sort;
        const users = await getUsersNotes(sort);
        res.json({ users });

    } catch (error) {
        next(error);
    };

};

const submitNoteController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { note } = req.body;
        const user: JWTPayload = res.locals.user;
        await updateUser({ id: user.user_id }, { note });
        res.json({ message: "Note set successfully." });

    } catch (error) {
        next(error);
    };

};

export {
    getNotesController,
    submitNoteController
};