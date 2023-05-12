import { Injectable, Inject } from '@nestjs/common';
import { Database, aql } from 'arangojs';

import { hash, compare } from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(@Inject('ARANGODB') private readonly db: Database, private jwtService: JwtService) { }



    async ValidateUser(username: string, password: string) {



        //implement your own logic to validate the user

        try {

    
            const FindUser = await this.db.query(aql`FOR u IN UserAccount FILTER u.username == ${username.toLowerCase()} RETURN u`);
            const userFound = await FindUser.next();

            if (!userFound) {
                //send the user to the signup page
                console.log("no user found");
                return null;
            }

            let user = { username: username, profileId: userFound.profileId};

            const checkedpassword = await compare(password, userFound.password);

            if (!checkedpassword || username.toLowerCase() !== userFound.username.toLowerCase()) {

            
                return null;
            }

            return user;

        }
        catch (error) {
            console.log("error", error);
            return { success: false, message: error.message };

        }







    }



    async login(user: any) {

        console.log("user", user);
        const payload = {
            username: user.username.toLowerCase(), sub:
            {
                profileId: user.profileId

            }


        };
        console.log("payload", payload);

        return {
            ...user,
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
        };



    }

    async refreshToken(user: any) {

        console.log("user", user);
        const payload = { username: user.username, sub: user.profileId };
        console.log("payload", payload);

        return {

            access_token: this.jwtService.sign(payload),
        };



    }










}
