import AuthorizationError from "../errors/authorization.error.js"

const validateAdminAuthorization = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        throw new AuthorizationError();
    }
    next()
}

export default validateAdminAuthorization