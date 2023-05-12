import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
dotenv.config()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor() {

        super({
           jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.jwt_secret,


        }  )
    }

    async validate(payload: any) {
        return {profileId:payload.sub.profileId, username:payload.username, isOwner:payload.sub.isOwner};
    }


    
}