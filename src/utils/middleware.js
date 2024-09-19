import jwt from "jsonwebtoken";
import config from "./config.js";

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    req.token = token;
  }
  next();
};

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, config.SECRET_KEY);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  req.user = {
    dni: decodedToken.dni,
    role: decodedToken.role,
    id: decodedToken.id,
  };

  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

export { tokenExtractor, userExtractor, unknownEndpoint };
