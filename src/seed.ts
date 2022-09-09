import { db } from "./db";
import { hashPassword } from "./utils";
import { faker } from '@faker-js/faker';

const seedDatabase = async () => {

    await db.user.deleteMany({ where: {} })
    await db.member.deleteMany({ where: {} })

    await db.user.createMany({
        data: [
            { email: "admin@example.com", password: hashPassword("password@admin"), role: "admin" },
            { email: "a@example.com", password: hashPassword("password@a"), role: "user" },
            { email: "b@example.com", password: hashPassword("password@b"), role: "user" },
            { email: "c@example.com", password: hashPassword("password@c"), role: "user" },
            { email: "d@example.com", password: hashPassword("password@d"), role: "user" },
            { email: "e@example.com", password: hashPassword("password@e"), role: "user" },
        ]
    });

    const users = await db.user.findMany({});

    const fake_data: { name: string }[] = [];
    for (let i = 0; i < 20; i++) {
        fake_data.push({ name: faker.name.fullName() });
    };

    await db.member.createMany({
        data: fake_data,
    });

    console.log("NEW USERS\n\n", JSON.stringify(users, null, "\t"));

};


seedDatabase();
