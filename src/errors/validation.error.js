import CustomError from './custom.error.js'

export default class ValidationError extends CustomError {
    constructor(message = 'Datos inválidos', errors = null) {
        super(message, 400)
        if(errors){
            this.errors = errors;
        }
    }
}