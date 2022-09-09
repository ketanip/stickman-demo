import dotenv from "dotenv";
dotenv.config();

const config = {
    SESSION_SECRET: String(process.env.SESSION_SECRET) || "SESSION_SECRET",
    SALT_ROUNDS: 11,
};

export default config;