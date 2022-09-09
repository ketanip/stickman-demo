"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const utils_1 = require("./utils");
const faker_1 = require("@faker-js/faker");
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.db.user.deleteMany({ where: {} });
    yield db_1.db.member.deleteMany({ where: {} });
    yield db_1.db.user.createMany({
        data: [
            { email: "admin@example.com", password: (0, utils_1.hashPassword)("password@admin"), role: "admin" },
            { email: "a@example.com", password: (0, utils_1.hashPassword)("password@a"), role: "user" },
            { email: "b@example.com", password: (0, utils_1.hashPassword)("password@b"), role: "user" },
            { email: "c@example.com", password: (0, utils_1.hashPassword)("password@c"), role: "user" },
            { email: "d@example.com", password: (0, utils_1.hashPassword)("password@d"), role: "user" },
            { email: "e@example.com", password: (0, utils_1.hashPassword)("password@e"), role: "user" },
        ]
    });
    const users = yield db_1.db.user.findMany({});
    const fake_data = [];
    for (let i = 0; i < 20; i++) {
        fake_data.push({ name: faker_1.faker.name.fullName() });
    }
    ;
    yield db_1.db.member.createMany({
        data: fake_data,
    });
    console.log("NEW USERS\n\n", JSON.stringify(users, null, "\t"));
});
seedDatabase();
