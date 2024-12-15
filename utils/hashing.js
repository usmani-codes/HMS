import bcrypt from "bcryptjs";

export const getPasswordHashed = (password, h) => bcrypt.hash(password, h)
export const getPasswordCompared = (password, dbPassword) => bcrypt.compare(password, dbPassword)

