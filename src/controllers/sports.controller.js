import { Sport } from "../models/Sport.js";

export const getSports = async (req, res) => {
  try {
    const sports = await Sport.findAll();
    res.json(sports);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
