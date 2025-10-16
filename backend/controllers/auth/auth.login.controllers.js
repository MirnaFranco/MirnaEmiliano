import { compareSync }  from 'bcrypt';
import { generateJWT } from '../../helpers/generateJWT.js';
import { connectDB } from '../dataBase.js'; // Importa la función para conectar a la base de datos

export async function login(req, res) {
  try{
  const { email, password } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ?";
    const connection = await connectDB();
    const [rows] = await connection.query(sql, [email]);
    const user = rows[0];
    
    if (!user) {
      connection.end();
      return res.status(401).json({ message: "Usuario no existe" });
    }

    const isPasswordValid = compareSync(password, user.contraseña);
    if (!isPasswordValid) {
      connection.end();
      return res.status(401).json({ message: "Contraseña inválida" });
    }

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

    connection.end();
    return res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
}

