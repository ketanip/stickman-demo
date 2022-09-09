import { db } from "./db";
import { hashPassword } from "./utils";
import { faker } from '@faker-js/faker';
import { Member, User } from "./types";

const seedDatabase = async () => {

    await db("users").delete().where({});
    await db("members").delete().where({});

    await db<User>("users").insert([
        { email: "admin@example.com", password: hashPassword("password@admin"), role: "admin" },
        { email: "a@example.com", password: hashPassword("password@a"), role: "user" },
        { email: "b@example.com", password: hashPassword("password@b"), role: "user" },
        { email: "c@example.com", password: hashPassword("password@c"), role: "user" },
        { email: "d@example.com", password: hashPassword("password@d"), role: "user" },
        { email: "e@example.com", password: hashPassword("password@e"), role: "user" },
    ]);

    const users = await db<User>("users").select("*");

    const fake_data: { name: string }[] = [];
    for (let i = 0; i < 20; i++) {
        fake_data.push({ name: faker.name.fullName() });
    };

    console.log(fake_data)
    await db<Member>("members").insert(fake_data);

    console.log("NEW USERS\n\n", JSON.stringify(users, null, "\t"));

};


seedDatabase();
