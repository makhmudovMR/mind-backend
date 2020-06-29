import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    // constructor() { }
    @Post('login')
    login(@Body() body) {
        // TODO
    }

    refreshToken(){
        return null;
    }
}
