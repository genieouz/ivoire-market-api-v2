import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { ProductCoverService } from '~/multimedia/images/services/product-cover.service';

@Controller('product')
export class ProductPublicController {
    constructor(
        private readonly productCoverService: ProductCoverService
    ) {}

    @Get('cover/:id')
    public async getCover(@Param('id') id: string, @Res() res): Promise<void> {
        const rs = await this.productCoverService.findOneById(id);
        if (rs === null) {
            return res.sendStatus(HttpStatus.NOT_FOUND);
        }
        rs.pipe(res);
    }
}
