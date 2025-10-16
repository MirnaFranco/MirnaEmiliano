import { hashSync }  from 'bcrypt';
import {generateJWT} from '../../helpers/generateJWT.js';
import { connectDB } from '../../dataBase.js';

export async function createUser(req, res) {
  try{
  const { name, email, password } = req.body;
  const id = Math.floor(Math.random() * Math.pow(10, 9));
  const hashContrasenia = hashSync(password, 10);
    const connection = await connectDB(); // Asegúrate de conectar a la base de datos
    const sql = 'INSERT INTO usuarios (idUsuario, nombre, email, contraseña) VALUES (?, ?, ?, ?)';
    const [rows] = await connection.query(sql, [id, name, email, hashContrasenia]);
    const user = rows;

    res.json({
      msg: 'Registrado correctamente',
    });

    connection.end();
    if (user.contraseña === hashContrasenia) {
      // Generar token JWT
      const token = await generateJWT(user.idUsuario);
      // Almacenar el token en la sesión del servidor
      req.session.token = token;
      // Almacenar el token en una cookie segura
      res.cookie("authToken", token, {
        httpOnly: true, // La cookie no es accesible desde JavaScript
        secure: false, // Cambiar a true en producción con HTTPS
        maxAge: 3600000, // Expiración en milisegundos (1 hora)
      });
      return res.json({ message: "Inicio de sesión exitoso" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
}