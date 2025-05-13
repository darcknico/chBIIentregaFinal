import { body, validationResult } from 'express-validator'
import ValidationError from '../../errors/validation.error.js';

const emailValidator = [
    body('email').exists().isLength({max:255}).isString().isEmail(),
    (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            throw new ValidationError('Datos inválidos',result.array())
        }
        return next()
    },
]

export default emailValidator