import { validateTokenJWT } from "../../helpers/validateToken.js";
import { connectDB } from '../../dataBase.js';
  
  export async function removeUser (req, res) {
   try { 
      const id = +req.params.id;
        // Tomamos el token desde los headers de la peticion de la siguiente manera:
    const token = req.headers.token;

        // Utilizamos el helper para validar el token.
        const usuario = await validateTokenJWT(token);
        // delete query
      const connection = await connectDB();
      const [results] = await connection.query('DELETE FROM usuarios WHERE idUsuario = ?', [usuario.idUsuario]);
  
      // usuario no encontrado
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado.' }); 
      }
      
      res.json({ message: "Usuario eliminado", results }); 
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al borrar.' }); 
    }
  }