import {
  Controller,
  Get,
  Param,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarImageService } from '~/multimedia/images/services/avatar-image.service';
import { imageFilter } from '~/multimedia/images/image-filter';
import {
  allowedImageFormats,
  maxFileSizeForAvatars,
} from '~/multimedia/images/images-restrictions';
import { IncomingFile } from '~/multimedia/incoming-file';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { IUser } from '~/user/interfaces/user.interface';

@Controller('multimedia/images')
export class ImagesController {
  constructor(
    private readonly avatarImageService: AvatarImageService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Put('avatar')
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFilter }))
  public async uploadAvatar(
    @UploadedFile() file: IncomingFile,
    currentUser: IUser = { _id: '5e9aca1fd1c3ad155b6d1c10' } as IUser,
  ): Promise<any> {
    console.log(currentUser);
    if (file === undefined) {
      const errorMessage = `Supported image formats: ${allowedImageFormats.join(
        ', ',
      )}; Max file size: ${maxFileSizeForAvatars} bytes`;
      throw new UnprocessableEntityException(errorMessage);
    }
    return this.avatarImageService.rewriteAvatarImage(file, currentUser);
  }

  @Get('avatar/:id')
  public async getAvatar(@Param('id') id: string, @Res() res): Promise<void> {
    const rs = await this.avatarImageService.findOneById(id);
    if (rs === null) {
      return res.sendStatus(HttpStatus.NOT_FOUND);
    }
    rs.pipe(res);
  }
}
