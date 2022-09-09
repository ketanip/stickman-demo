import knex from "knex";
import config from "../config";

const db = knex({
    client: "postgresql",
    connection: {
        connectionString: config.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
});

export { db };