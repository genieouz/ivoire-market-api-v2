import { Controller, UseGuards, Post, UseInterceptors, Body, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from '~/auth/guards/auth-guard';
import { ProductService } from '~/products/services/product.service';
import { ProductCoverService } from '~/multimedia/images/services/product-cover.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IProduct } from '~/products/models/interfaces/product.interface';
import { AnyObject } from '~/commons/typings/typescript';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { IUser } from '~/user/interfaces/user.interface';
import { AttachmentsService } from '~/attachment/services/attachment.service';
import { AttachmentRecord } from '~/attachment/dto/attachment-record.type';
import { IncomingFile } from '~/commons/multimedia/typings/incoming-file';
import { ObjectID } from 'bson';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly productCoverService: ProductCoverService,
        private readonly attachmentsService: AttachmentsService
    ) {}

    @Post('')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cover', maxCount: 1 },
        { name: 'gallery', maxCount: 50 },
    ]))
    async create(
        @Body() productInput: AnyObject,
        @UploadedFiles() files,
        @CurrentUser() currentUser: IUser,
    ): Promise<IProduct> {
        const product = await this.productService.insertOne({ ...productInput, owner: currentUser._id });
        const cover = files.cover && files.cover[0];
        const gallery = files.gallery;

        // if (cover === undefined) {
        //     const errorMessage = `Supported image formats: ${allowedImageFormats.join(
        //         ', ',
        //     )}; Max file size: ${maxFileSizeForEventPosters} bytes`;
        //     throw new UnprocessableEntityException(errorMessage);
        // }
        let coverImage;
        if(cover) {
            // await this.productCoverService.rewriteProductCover(cover, product._id);
            coverImage = await this.attachmentsService.putAttachment(
                cover,
                {
                    uploadedBy: currentUser._id,
                },
                currentUser._id,
            )
        }
        const galleryFiles: Promise<AttachmentRecord>[] = [];
        if (gallery && gallery.length) {
            gallery.map((file: IncomingFile) => {
                galleryFiles.push(this.attachmentsService.putAttachment(
                    file,
                    {
                        uploadedBy: currentUser._id,
                    },
                    currentUser._id,
                ));
            });
        }
        return this.productService.updateOneById(product._id, {
            gallery: await Promise.all(galleryFiles),
            cover: coverImage
        });
    }

    async update(
        @Body('productId') productId: string,
        @Body('productInput') productInput: AnyObject,
        @UploadedFiles() files,
        @CurrentUser() currentUser: IUser,
    ): Promise<IProduct> {
        await this.productService.findOneOrFail({ _id: new ObjectID(productId), owner: currentUser._id });
        const product = await this.productService.updateOneById(productId, {
            ...productInput,
        });
        const cover = files.cover && files.cover[0];
        const gallery = files.gallery;

        // if (cover === undefined) {
        //     const errorMessage = `Supported image formats: ${allowedImageFormats.join(
        //         ', ',
        //     )}; Max file size: ${maxFileSizeForEventPosters} bytes`;
        //     throw new UnprocessableEntityException(errorMessage);
        // }
        let coverImage;
        if(cover) {
            // await this.productCoverService.rewriteProductCover(cover, product._id);
            coverImage = this.attachmentsService.putAttachment(
                cover,
                {
                    uploadedBy: currentUser._id,
                },
                currentUser._id,
            )
        }
        const galleryFiles: Promise<AttachmentRecord>[] = [];
        if (gallery && gallery.length) {
            gallery.map((file: IncomingFile) => {
                galleryFiles.push(this.attachmentsService.putAttachment(
                    file,
                    {
                        uploadedBy: currentUser._id,
                    },
                    currentUser._id,
                ));
            });
        }
        return this.productService.updateOneById(product._id, {
            gallery: await Promise.all(galleryFiles),
            cover: coverImage
        });
    }
}
