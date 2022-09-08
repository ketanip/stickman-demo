import dotenv from "dotenv";
dotenv.config();

const config = {
    JWT_SECRET: String(process.env.JWT_SECRET) || "JWT_SECRET",
    SALT_ROUNDS: 11,
};

export default config;