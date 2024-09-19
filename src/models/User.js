import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Scolarship } from "./Scolarship.js";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("applicant", "admin"),
    defaultValue: "applicant",
    allowNull: false,
  },
});

User.hasMany(Scolarship, {
  foreignKey: "userId",
  sourceKey: "id",
});

Scolarship.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});
