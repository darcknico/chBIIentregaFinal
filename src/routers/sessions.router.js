import {Router} from 'express'
import { 
    userLogin,
    userCurrent,
    userRegister,
    sendRestoreEmail,
    restorePassword
} from '../controllers/users.controller.js';
import { passportCall } from '../middlewares/passport-call.js';
import emailValidator from '../middlewares/validators/email.validator.js';
import userValidation from '../middlewares/validators/user.validator.js';
import restorePasswordValidator from '../middlewares/validators/restore-password.validator.js';

export const sessionsRouter = Router();

sessionsRouter.post('/login', userLogin);
sessionsRouter.post('/register',[userValidation], userRegister);
sessionsRouter.get('/current', [passportCall()], userCurrent);
sessionsRouter.post('/password-restore', [emailValidator], sendRestoreEmail)
sessionsRouter.post('/password-restore/:token', [restorePasswordValidator], restorePassword)