import CustomError from './custom.error.js'

export default class AuthenticationError extends CustomError {
    constructor(message = 'No pudo autenticarse') {
        super(message, 401)
    }
}