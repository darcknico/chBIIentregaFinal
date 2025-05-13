import passport from'passport'
import AuthorizationError from '../errors/authorization.error.js'

export const passportCall=()=>{
    return async(req,res,next)=>{
        passport.authenticate("current", { session: false },(error,user,info)=>{
            if(error)return next(error)
            if(!user){
                throw new AuthorizationError(info.toString());
            }
            req.user=user
            next()
        })(req,res,next)
    }
}