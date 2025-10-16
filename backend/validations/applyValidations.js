import { validationResult} from 'express-validator';
export const applyValidations = (req,res, next) => {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
            res.status(400).json({errores: errores.array()})
        return;
    };

next()
}