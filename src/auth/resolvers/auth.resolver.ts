import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserService } from "~/user/services/user.service";
import { LoginInput } from "~/auth/dto/login.input";
import { RegisterInput } from "~/auth/dto/register.input";
import { Session } from "~/auth/dto/session.entity";
import { AuthService } from "~/auth/services/auth.service";
import { UserRoles } from "~/user/enums/user-roles.enum";
import { TokenService } from "~/auth/services/token.service";
import { NotFoundException } from "@nestjs/common";
import { UpdatePasswordDto } from "../dto/update-password.dto";
import { LoginAdminDto } from "../dto/login-admin.dto";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    @Query(returns => Session)
    login(
        @Args({ name: 'loginInput', type: () => LoginInput }) loginInput: LoginInput
    ): Promise<Session> {
        return this.authService.signin(loginInput);
    }

    @Mutation(returns => Session)
    register(
        @Args({ name: 'registerInput', type: () => RegisterInput }) RegisterInput: RegisterInput
    ): Promise<Session> {
        return this.authService.signup(RegisterInput); 
    }

    @Query(returns => String)
    async resetPassword(
        @Args({ name: 'email', type: () => String }) email: string,
    ): Promise<string> {
        await this.userService.findOneOrFail({ email });
        return this.authService.sendResetPasswordEmail(email);
    }

    @Mutation(returns => Boolean)
    async updatePassword(
        @Args({ name: 'updatePasswordDto', type: () => UpdatePasswordDto }) updatePasswordDto: UpdatePasswordDto,
    ): Promise<boolean> {
        const payload = this.tokenService.verify(updatePasswordDto.resetToken);
        console.log(payload)
        if(!payload || payload.sub.code !== updatePasswordDto.resetCode) {
            throw new NotFoundException('Token expiré');
        } else {
            const user  = await this.userService.findOneOrFail({ email: payload.sub.email });
            await this.userService.updateOneById(user._id, { password: updatePasswordDto.password });
        }
        return true; 
    }

}