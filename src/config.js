import { config } from "dotenv";
config();

export const DB_CONNECTION = process.env.DB_CONNECTION || ''
export const PORT = process.env.PORT || 3000