import { School } from "../models/School.js";

export const getSchools = async (req, res) => {
  try {
    const schools = await School.findAll();
    res.json(schools);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
