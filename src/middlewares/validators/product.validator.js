import { body, validationResult } from 'express-validator'
import ValidationError from '../../errors/validation.error.js';

export default [
    body('name').exists().isLength({max:255}).isString().not().isEmpty(),
    body('description').exists().isLength({max:255}).isString().not().isEmpty(),
    body('price').exists().isInt({min:0}).not().isEmpty(),
    body('stock').exists().isInt({min:0}).not().isEmpty(),
    (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            throw new ValidationError('Datos inválidos',result.array())
        }
        return next()
    },
]