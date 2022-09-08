import Joi from "joi";


const getNotesValidator = Joi.object({
    sort: Joi.string().allow("asc", "desc").default("asc"),
});

const addNoteValidator = Joi.object({
    note: Joi.string().required(),
});

export {
    getNotesValidator,
    addNoteValidator,
};