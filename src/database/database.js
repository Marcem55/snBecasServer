import { Sequelize } from "sequelize";
import config from "../utils/config.js";

export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);
