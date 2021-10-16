import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from '~/auth/services/auth.service';
import { LoginInput } from '~/auth/dto/login.input';
import { Session } from '~/auth/dto/session.entity';
import { RegisterInput } from '~/auth/dto/register.input';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signup(@Body() user: RegisterInput): Promise<Session> {
        console.log('kk')
        return this.authService.signup(user);
    }

    @Post('signin')
    signin(@Body() credentials: LoginInput): Promise<Session> {
        return this.authService.signin(credentials);
    }
}
