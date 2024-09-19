import { Neighborhood } from "../models/Neighborhood.js";

export const getNeigborhoods = async (req, res) => {
  try {
    const neigborhoods = await Neighborhood.findAll();
    res.json(neigborhoods);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
