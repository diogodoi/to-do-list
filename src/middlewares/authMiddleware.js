import redisClient from "../config/redisClient.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Acesso negado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o token existe no Redis
    const storedToken = await redisClient.get(`token:${decoded.id}`);
    if (!storedToken || storedToken !== token) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    req.user = decoded; // Adiciona o usuário ao objeto de request
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};
