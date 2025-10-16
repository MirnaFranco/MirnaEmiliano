import {param} from 'express-validator'

export const userValidations = [
    param('id')
    .isInt().withMessage('ID debe ser un número entero')
    .notEmpty().withMessage('el ID no existe')
];

