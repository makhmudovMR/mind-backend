import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly auth: AuthService,
    ) { }
    @Post('login')
    login(@Body() body) {
        return this.auth.login(body);
    }

    @Post('register')
    register(@Body() body) {
        // TODO
    }

    @Post('logout')
    logout(@Body() body) {
        return this.auth.logout(body);
    }

    @Post('refreshtoken')
    refreshToken(@Body() body) {
        return this.auth.refreshToken(body);
    }

    @Get('allusers')
    getAllUsers() {
        return this.auth.allUsers();
    }

    @Get('alltokens')
    getAllTokens() {
        this.auth.allTokens();
    }

}
