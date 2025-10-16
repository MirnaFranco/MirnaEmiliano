import { compareSync }  from 'bcrypt';
import {generateJWT} from '../helpers/generarJWT.js';
import {connectDB} from '../dataBase.js';

export async function verifyUser (req, res) {
    try{
    const { email, password } = req.body;
      const connection = await connectDB(); 
  
      // 3. Insert Query
      const sql ='SELECT * FROM usuarios WHERE email = ?'; 
      const user = await connection.query(sql, email);
    const validateUser = user[0][0];
      // En caso de que no se encuentre ningun usuario, retornamos un error.
      if(!validateUser){
          return res.status(400).json({
              msg: 'El usuario no existe'
          })
      }
  
      // Comparamos las contraseñas con el metodo compareSync que nos devolvera un true o false.
      const validatePassword = compareSync(password, validateUser.contraseña);
  
      // En caso de que no coincidan, retornamos un error sin dar información especifica de lo que fallo.
      if(!validatePassword){
          return res.status(401).json({
              msg: 'El usuario o contraseña no coiciden'
          })
      }
  
      // Hacemos uso del helper para generar el token y le pasamos el id.
      const token = await generateJWT({id: validateUser.idUsuario});
  
      //Retornamos el token con un mensaje al cliente.
      return res.json({
          msg: 'Inicio de sesión exitoso',
          token
      })
  
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor.' }); 
    }
  }

  