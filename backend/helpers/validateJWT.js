import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { connectDB } from "../dataBase.js";

// Middleware para verificar el token JWT
export const validateJWT = async (req, res, next) => {
  const token = req.cookies.authToken || req.session.token;
  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, SECRET_KEY);
    const connection = await connectDB();

    // Buscar el usuario por ID
    const [users] = await connection.query("SELECT * FROM usuarios WHERE idUsuario=? LIMIT 1", [decoded.userId]);

    // Verificar si el usuario existe
    if (users.length === 0) {
      return res.status(401).json({ message: "Token inválido" });
    } else {
      req.user = { id: users[0].idUsuario }; // Asegúrate de asignar correctamente el ID del usuario
      next(); // Continuar al siguiente middleware o ruta
    }
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
