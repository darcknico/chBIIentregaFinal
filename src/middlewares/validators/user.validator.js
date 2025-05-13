import { body, validationResult } from 'express-validator'
import ValidationError from '../../errors/validation.error.js';

const userValidation = [
    body('first_name').exists().isLength({max:255}).isString().not().isEmpty(),
    body('last_name').exists().isLength({max:255}).isString().not().isEmpty(),
    body('email').exists().isLength({max:255}).isString().isEmail(),
    body('age').exists().isInt({min:1,max:200}),
    body('password').exists().isString().isLength({min:6,max:12}),
    (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            throw new ValidationError('Datos inválidos',result.array())
        }
        return next()
    },
]

export default userValidation