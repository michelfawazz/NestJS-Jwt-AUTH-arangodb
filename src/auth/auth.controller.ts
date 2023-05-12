import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}



    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);

    }


    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refresh(@Request() req) {
        return this.authService.refreshToken(req.user);
    }

    

}
