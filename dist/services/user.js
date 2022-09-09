"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.findUniqueUser = void 0;
const db_1 = require("../db");
const findUniqueUser = (where) => {
    const user = db_1.db.user.findUnique({ where });
    return user;
};
exports.findUniqueUser = findUniqueUser;
const updateUser = (where, updated_data) => {
    const user = db_1.db.user.update({ where, data: updated_data });
    return user;
};
exports.updateUser = updateUser;
