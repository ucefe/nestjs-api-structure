import { Controller, UseGuards, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import RoleGuard from 'src/common/guards/role.guard';
import { Role } from 'src/common/enums/role.enum';
import { buyProductDto } from '../dto';
import { ProductService, productCrudService } from '../providers';
import { ReqUser } from 'src/common/decorators';

@ApiTags('Buy')
@Controller('buy')
export class BuyController {
    constructor(private productCrud: productCrudService,
        private productService: ProductService) { }

    @ApiCreatedResponse({ description: 'Bought Successfully' })
    @ApiInternalServerErrorResponse({ description: 'Error ' })
    @UseGuards(RoleGuard(Role.BUYER))
    @Post()
    public async buy(@ReqUser() req, @Body() buyProductDto: buyProductDto, @Res() res) {
        const result = await this.productService.buy(buyProductDto.productId, buyProductDto.amountOfProducts, req.userId)
        if (result) {
            return res
                .status(HttpStatus.CREATED)
                .json({ data: result });
        }
    }

}
