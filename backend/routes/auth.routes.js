import { Router } from 'express';
import { login } from '../controllers/auth/auth.login.controllers.js'; // Importa el controlador
import { createUser } from '../controllers/auth/auth.signin.controller.js';
import { removeUser } from '../controllers/auth/auth.remove.controller.js';
import { validateSession } from '../controllers/auth/auth.validateSession.controller.js';
import { logout } from '../controllers/auth/auth.logout.controller.js';
import { validacionCrearUsuario } from '../validations/validacionCrearUsuario.js';
import { userValidations } from '../validations/userValidations.js';
import { validateJWT } from '../helpers/validateJWT.js';
import { applyValidations } from '../validations/applyValidations.js';

const userRouter = Router();
// Rutas
userRouter.get('/session',validateJWT, validateSession);
userRouter.post('/reg',validacionCrearUsuario,userValidations,applyValidations, createUser);
userRouter.delete('/:id',userValidations,applyValidations, removeUser);
userRouter.post('/login',login);
userRouter.post('/logout',validateJWT,logout)

export {userRouter};