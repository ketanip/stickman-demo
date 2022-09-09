import {} from "../types";
import { Request, Response, NextFunction } from "express";
import { findUniqueUser, getUsersNotes, updateUser } from "../services";
import { addNoteValidator, getNotesValidator } from "../validators";

const getNotesController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {error, value, warning} = getNotesValidator.validate(req.query, { stripUnknown: true});
        if (error) {
            res.render("user",{ message: error.message });
            return;
        };

        const query: any = value;
        const sort = query.sort;
        const users = await getUsersNotes(sort);
        res.render("admin", { users });

    } catch (error) {
        next(error);
    };

};

const submitNoteController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {error, value, warning} = addNoteValidator.validate(req.body, { stripUnknown: true});
        if (error) {
            res.render("user",{ message: error.message });
            return;
        };

        const { note } = value;
        const user = req.session.user;
        if (!user) {
            res.redirect("/auth/sign-in");
            return;
        };

        const updated_user = await updateUser({ id: user.user_id }, { note });
        res.render("user", { note: updated_user.note, message: "Note set successfully." });

    } catch (error) {
        next(error);
    };

};

const getSubmitNoteController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = req.session.user;
        if (!user) {
            res.redirect("/auth/sign-in");
            return;
        };

        const data = await findUniqueUser({ id: user.user_id })
        res.render("user", { note: data?.note });

    } catch (error) {
        next(error);
    };

};

export {
    getNotesController,
    submitNoteController,
    getSubmitNoteController
};