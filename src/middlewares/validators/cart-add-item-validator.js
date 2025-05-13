import { body, validationResult } from 'express-validator'
import ValidationError from '../../errors/validation.error.js';

const cardAddItemValidator = [
    body('product_id').exists().notEmpty(),
    body('quantity').exists().isInt({min:1}).notEmpty(),
    (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            throw new ValidationError('Datos inválidos',result.array())
        }
        return next()
    },
]

export default cardAddItemValidator