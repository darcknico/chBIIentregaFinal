import passport from "passport";
import jwt from "passport-jwt";
import { config } from "./index.js";
import { UserModel } from "../dao/mongodb/models/user.model.js";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null
    if(req && req.cookie){
        token = req.cookie["token"]
    }
    return token
}


export const initializePassport = ()=>{
    passport.use("current", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor,ExtractJwt.fromAuthHeaderAsBearerToken()]),
        secretOrKey: config.SECRET_KEY,
    },async(payload, done)=>{
        try {
            const user = await UserModel.findById(payload.id);
            if (user) return done(null, user);
        } catch (error) {
            return done(error)
        }
    }))

}