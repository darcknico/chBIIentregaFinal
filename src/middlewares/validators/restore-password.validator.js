import { body, validationResult } from 'express-validator'
import ValidationError from '../../errors/validation.error.js';

const restorePasswordValidator = [
    body('password').exists().isString().isLength({min:6,max:12}),
    (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            throw new ValidationError('Datos inválidos',result.array())
        }
        return next()
    },
]

export default restorePasswordValidator