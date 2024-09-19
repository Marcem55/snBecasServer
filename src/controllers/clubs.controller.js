import { Club } from "../models/Club.js";

export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.findAll();
    res.json(clubs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
