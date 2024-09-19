import { Town } from "../models/Town.js";

export const getTowns = async (req, res) => {
  try {
    const towns = await Town.findAll();
    res.json(towns);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
