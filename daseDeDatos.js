import { createConnection } from 'mysql2/promise';

// Creamos una funcion para realizar la conexion a la bd.
export const connectDB = async ()=> {
    try {
    return await createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'seguridad_ciudadana'
    })
} catch (error){
res.json({error})
}
}
