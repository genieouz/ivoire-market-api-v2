import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, UnprocessableEntityException, Body } from '@nestjs/common';
import { AuthGuard } from '~/auth/guards/auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFilter } from '~/multimedia/images/image-filter';
import { IncomingFile } from '~/multimedia/incoming-file';
import { IUser } from './interfaces/user.interface';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { allowedImageFormats, maxFileSizeForAvatars } from '~/multimedia/images/images-restrictions';
import { AvatarImageService } from '~/multimedia/images/services/avatar-image.service';
import { UserInput } from '~/user/dto/user.input';
import { UserService } from '~/user/services/user.service';
import { ForRoles } from '~/auth/decorators/for-roles.decorator';
import { UserRoles } from '~/user/enums/user-roles.enum';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly avatarImageService: AvatarImageService,
        private readonly userService: UserService,
    ) { }

    @ForRoles(UserRoles.ADMIN)
    @Post('create-admin')
    @UseInterceptors(FileInterceptor('avatar', { fileFilter: imageFilter }))
    public async uploadAvatar(
        @UploadedFile() avatar: IncomingFile,
        @CurrentUser() currentUser: IUser,
        @Body() userDto: UserInput,
    ): Promise<IUser> {
        const user = await this.userService.insertOne({ ...userDto, role: UserRoles.ADMIN });
        if (avatar !== undefined) {
            await this.avatarImageService.rewriteAvatarImage(avatar, user);
        }
        return user;
    }
}
