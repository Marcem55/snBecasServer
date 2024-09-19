import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { School } from "./School.js";
import { Town } from "./Town.js";
import { Neighborhood } from "./Neighborhood.js";
import { Club } from "./Club.js";
import { Sport } from "./Sport.js";
import { Category } from "./Category.js";

export const Scolarship = sequelize.define("scolarships", {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  genre: {
    type: DataTypes.ENUM("Femenino", "Masculino"),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dniFront: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dniBack: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Buenos Aires",
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Partido de San Nicolás",
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  streetNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  apartment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  between1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  between2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observations: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("Pendiente", "Aceptada", "Rechazada"),
    defaultValue: "Pendiente",
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "",
  },
});

School.hasMany(Scolarship, {
  foreignKey: "schoolId",
  sourceKey: "id",
});

Scolarship.belongsTo(School, {
  foreignKey: "schoolId",
  targetKey: "id",
});

Town.hasMany(Scolarship, {
  foreignKey: "townId",
  sourceKey: "id",
});

Scolarship.belongsTo(Town, {
  foreignKey: "townId",
  targetKey: "id",
});

Neighborhood.hasMany(Scolarship, {
  foreignKey: "neighborhoodId",
  sourceKey: "id",
});

Scolarship.belongsTo(Neighborhood, {
  foreignKey: "neighborhoodId",
  targetKey: "id",
});

Club.hasMany(Scolarship, {
  foreignKey: "clubId",
  sourceKey: "id",
});

Scolarship.belongsTo(Club, {
  foreignKey: "clubId",
  targetKey: "id",
});

Sport.hasMany(Scolarship, {
  foreignKey: "sportId",
  sourceKey: "id",
});

Scolarship.belongsTo(Sport, {
  foreignKey: "sportId",
  targetKey: "id",
});

Category.hasMany(Scolarship, {
  foreignKey: "categoryId",
  sourceKey: "id",
});

Scolarship.belongsTo(Category, {
  foreignKey: "categoryId",
  targetKey: "id",
});
