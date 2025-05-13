import CustomError from './custom.error.js'

export default class ConflictError extends CustomError {
    constructor(message = 'Hubo un conflicto en la consulta') {
        super(message, 409)
    }
}