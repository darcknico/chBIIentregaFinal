import CustomError from './custom.error.js'

export default class NotFoundError extends CustomError {
    constructor(message = 'Recurso no encontrado') {
        super(message, 404)
    }
}