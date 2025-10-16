import {validateTokenJWT} from '../../helpers/validateToken.js';

export async function validateSession(req, res) {
    try {
      const token = req.cookies.authToken || req.session.token; // Obtener el token de la cookie o sesión
      console.log('Token:', token); // Verificar el valor del token en la consola
  
      if (!token) {
        return res.status(401).json({ message: "No se proporcionó token" });
      }
  
      const user = await validateTokenJWT(token); // Verificar el token
      
      if (user) {
        req.user = user; // Asigna el usuario al objeto req
        return res.json({
          message: "Acceso permitido a área protegida",
          user: req.user,
        });
      } else {
        return res.status(401).json({ message: "Acceso denegado" });
      }
    } catch (error) {
      console.error('Error validando la sesión:', error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
  

  