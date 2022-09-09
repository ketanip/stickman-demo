import Joi from "joi";


const getMemberActivatorValidator = Joi.object({
    sort: Joi.string().allow("asc", "desc").default("asc"),
});

const addMemberValidator = Joi.object({
    member_id: Joi.number().required(),
});

export {
    getMemberActivatorValidator,
    addMemberValidator,
};