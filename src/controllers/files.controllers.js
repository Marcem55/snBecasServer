import "dotenv/config";
import ftp from "basic-ftp";
import { PassThrough } from "stream";

export const uploadFile = async (files) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: true,
      secureOptions: {
        rejectUnauthorized: false, // Desactiva la verificación del certificado para modo dev (debería contratar un cert si sale a prod)
      },
    });

    const uploadedPaths = [];

    // Subir archivos secuencialmente
    for (const file of files) {
      const remotePath = `/uploads/${file.originalFilename}`;
      await client.uploadFrom(file.filepath, remotePath);
      uploadedPaths.push(remotePath);
    }

    return uploadedPaths;
  } catch (err) {
    console.error(err);
    throw new Error("Error subiendo el archivo al FTP");
  } finally {
    client.close();
  }
};

export const getFileFromFTP = async (filename) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: true,
      secureOptions: {
        rejectUnauthorized: false, // En desarrollo, desactiva la verificación del certificado
      },
    });

    // Usamos un PassThrough stream para obtener el archivo sin guardarlo en disco
    const stream = new PassThrough();
    await client.downloadTo(stream, `/uploads/${filename}`);
    return stream;
  } catch (error) {
    console.error("Error obteniendo el archivo desde el FTP:", error);
    throw error;
  } finally {
    client.close();
  }
};
