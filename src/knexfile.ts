import type { Knex } from "knex";

// Custom env for migrations.
import dotenv from "dotenv";
dotenv.config({path: "../.env"});

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
  
  },

};

export default config;
