import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly auth: AuthService,
    ) {}
    @Post('login')
    login(@Body() body) {
        return this.auth.login(body);
        // TODO
    }

    @Post('register')
    register(@Body() body) {
        // TODO
    }

    @Post('refreshtoken')
    refreshToken(@Body() body) {
        return null;
    }
}
