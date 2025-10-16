import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { connectDB } from "../dataBase.js";

export const validateTokenJWT = async (token) => {
  try {
    if (typeof token !== 'string') {
      throw new Error('El token JWT no es una cadena'); // Verificación adicional
    }
    
    const decoded = jwt.verify(token, SECRET_KEY); // Verificar el token
    const connection = await connectDB();

    // Buscar el usuario por ID
    const [users] = await connection.query("SELECT * FROM usuarios WHERE idUsuario=? LIMIT 1", [decoded.userId]);

    if (users.length === 0) {
      return null; // Usuario no encontrado
    }

    return { id: users[0].idUsuario }; // Devuelve el usuario decodificado
  } catch (error) {
    console.error('Error validando el JWT:', error);
    return null; // Token inválido
  }
};
