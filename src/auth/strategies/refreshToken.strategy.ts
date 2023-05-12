import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
dotenv.config()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor() {

        super({
           jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            ignoreExpiration: false,
            secretOrKey: process.env.jwt_secret,


        }  )
    }

    async validate(payload: any) {
        return {profileId:payload.sub, username:payload.username};
    }


    
}