import redisClient from "../config/redisClient.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    try {
      await redisClient.set(`token:${user._id}`, token, "EX", 3600);
    } catch (err) {
      console.error("Erro ao salvar token no Redis:", err.message);
      return res.status(500).json({ error: "Erro no sistema de autenticação" });
    }

    res.json({
      message: "Login bem-sucedido",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const logout = async (req, res) => {
  try {
    // Obtém o token do cabeçalho da requisição
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ error: "Token não fornecido" });

    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Remove o token do Redis
    await redisClient.del(`token:${decoded.id}`);

    res.json({ message: "Logout bem-sucedido" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email já registrado" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    // Recarrega o usuário sem o campo `password`
    const userResponse = await User.findById(newUser._id).select("-password");

    res.status(201).json({
      message: "Usuário registrado com sucesso",
      user: userResponse,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
