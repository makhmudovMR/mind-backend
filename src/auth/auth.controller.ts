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
        return this.auth.register(body);
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
        return this.auth.allTokens();
    }

    @Post('adduser')
    async addUser(@Body() body) {
        return await this.auth.addUser(body);
    }

    @Post('follow')
    async followToUser(@Body() body){
        console.log('test..')
        return await this.auth.followToUser(body)
    }
}
