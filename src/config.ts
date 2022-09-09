// Setting up environment variables.
import dotenv from "dotenv";
dotenv.config();

// Importing times.
import types from "./types";

// Global config.
const config = {
    DATABASE_URL: String(process.env.DATABASE_URL),
    SESSION_SECRET: String(process.env.SESSION_SECRET) || "SESSION_SECRET",
    SALT_ROUNDS: 11,
    PORT: process.env.PORT || 3001,
    cookieExpiry: 1000 * 60 * 60 * 24,
};

// Exporting config.
export default config;