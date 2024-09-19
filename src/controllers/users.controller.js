import { Scolarship } from "../models/Scolarship.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

export const auth = async (req, res) => {
  const { dni } = req.body;

  try {
    const user = await User.findOne({ where: { dni } });

    if (user) {
      return login(req, res, user);
    } else {
      return register(req, res);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, user) => {
  const userForToken = {
    dni: user.dni,
    role: user.role,
    id: user.id,
  };

  const token = jwt.sign(userForToken, config.SECRET_KEY);

  res.status(200).json({ token, user });
};

const register = async (req, res) => {
  const { dni } = req.body;

  try {
    const newUser = await User.create(
      dni == 40668973 ? { dni, role: "admin" } : { dni }
    );

    const userForToken = {
      dni: newUser.dni,
      role: newUser.role,
      id: newUser.id,
    };

    const token = jwt.sign(userForToken, config.SECRET_KEY);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
