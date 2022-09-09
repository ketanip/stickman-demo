import Joi from "joi";

const getMembersValidator = Joi.object({
    sort: Joi.string().allow("first", "last").default("first"),
});

const addMemberValidator = Joi.object({
    member_id: Joi.number().required(),
});

export {
    getMembersValidator,
    addMemberValidator,
}; 