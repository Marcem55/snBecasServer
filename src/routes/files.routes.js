import { Router } from "express";
import formidable from "formidable";
import {
  getFileFromFTP,
  uploadFile,
} from "../controllers/files.controllers.js";

const router = Router();

router.post("/", (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send("Error parsing the file");
    }

    const file = files.file;

    try {
      // Subir archivo al servidor FTP
      const ftpPaths = await uploadFile(file);
      res.status(200).json({ message: "Archivo subido con éxito", ftpPaths });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error subiendo el archivo");
    }
  });
});

router.get("/:filename", async (req, res) => {
  const { filename } = req.params;

  try {
    const fileStream = await getFileFromFTP(filename);
    fileStream.pipe(res); // Envía el archivo al frontend
  } catch (error) {
    console.error("Error obteniendo el archivo:", error);
    res.status(500).send("Error al obtener el archivo desde el servidor FTP");
  }
});

export default router;
