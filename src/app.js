import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import scolarshipRoutes from "./routes/scolarships.routes.js";
import schoolRoutes from "./routes/schools.routes.js";
import townRoutes from "./routes/towns.routes.js";
import neigborhoodRoutes from "./routes/neigborhoods.routes.js";
import clubRoutes from "./routes/clubs.routes.js";
import sportRoutes from "./routes/sports.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import filesRoutes from "./routes/files.routes.js";
import {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
} from "./utils/middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

app.use(tokenExtractor);

app.use("/api/users", userRoutes);
app.use("/api/scolarships", userExtractor, scolarshipRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/towns", townRoutes);
app.use("/api/neigborhoods", neigborhoodRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/sports", sportRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/upload", filesRoutes);

app.use(unknownEndpoint);

export default app;
