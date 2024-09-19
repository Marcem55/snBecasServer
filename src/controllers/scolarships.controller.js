import { Category } from "../models/Category.js";
import { Club } from "../models/Club.js";
import { Neighborhood } from "../models/Neighborhood.js";
import { School } from "../models/School.js";
import { Scolarship } from "../models/Scolarship.js";
import { Sport } from "../models/Sport.js";
import { Town } from "../models/Town.js";

const includeModels = [
  {
    model: Neighborhood,
    as: "neighborhood",
    attributes: ["id", "name"],
  },
  {
    model: Category,
    as: "category",
    attributes: ["id", "name"],
  },
  {
    model: Club,
    as: "club",
    attributes: ["id", "name"],
  },
  {
    model: School,
    as: "school",
    attributes: ["id", "name"],
  },
  {
    model: Sport,
    as: "sport",
    attributes: ["id", "name"],
  },
  {
    model: Town,
    as: "town",
    attributes: ["id", "name"],
  },
];

export const getScolarships = async (req, res) => {
  if (!req.token) return res.status(401).json({ error: "missing token" });
  if (!req.user) return res.status(401).json({ error: "unauthorized" });

  try {
    let scolarhips;
    if (req.user.role === "admin") {
      scolarhips = await Scolarship.findAll({
        include: includeModels,
      });
    } else {
      scolarhips = await Scolarship.findAll({
        where: {
          userId: req.user.id,
        },
        include: includeModels,
      });
    }
    res.json(scolarhips);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const getScolarship = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const project = await Project.findOne({
//       where: {
//         id,
//       },
//     });
//     if (!project)
//       return res.status(404).json({ message: "Project does not exists" });
//     res.json(project);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const createScolarship = async (req, res) => {
  if (!req.token) return res.status(401).json({ error: "missing token" });
  if (!req.user) return res.status(401).json({ error: "unauthorized" });

  try {
    const newScolarship = await Scolarship.create({
      ...req.body,
      userId: req.user.id,
    });

    res.json(newScolarship);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateScolarshipStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const scolarship = await Scolarship.findOne({
      where: {
        id,
      },
    });
    scolarship.set({
      status,
    });
    await scolarship.save();
    res.json(scolarship);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateScolarshipComments = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    // Encuentra la beca por su ID
    const scolarship = await Scolarship.findByPk(id);
    if (!scolarship) {
      return res.status(404).json({ message: "Scolarship not found" });
    }

    // Obtén los comentarios actuales o inicializa con un array vacío
    let currentComments = scolarship.comments;

    currentComments += comment + "|";

    scolarship.set({
      comments: currentComments,
    });

    // Guarda la beca con los comentarios actualizados
    await scolarship.save();

    res.json(scolarship);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const id = req.params.id;
  try {
    await Project.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
