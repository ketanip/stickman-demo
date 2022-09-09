import config from "../config";
import { compareSync, hashSync } from "bcrypt";

const hashPassword = (raw_password: string) => {
    return hashSync(raw_password, config.SALT_ROUNDS);
};

const verifyPassword = (raw_password: string, encrypted_password: string) => {
    return compareSync(raw_password, encrypted_password);
};

export {
    hashPassword,
    verifyPassword,
};