import "dotenv/config";

const config = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  FTP_HOST: process.env.FTP_HOST,
  FTP_USER: process.env.FTP_USER,
  FTP_PASSWORD: process.env.FTP_PASSWORD,
};

export default config;
