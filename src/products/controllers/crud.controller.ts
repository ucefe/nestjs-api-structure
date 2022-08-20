import { AuthenticatedGuard } from 'src/auth/guards';
import { Product } from 'src/entity';
import { Controller, Param, Res, Get, HttpStatus, Post, Body, Put, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { createProductDto, updateProductDto } from '../dto';
import { ApiTags, ApiBadRequestResponse, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import RoleGuard from 'src/common/guards/role.guard';
import { Role } from 'src/common/enums/role.enum';
import { ReqUser } from 'src/common/decorators';
import { ProductService } from '../providers/product.service';
import { productCrudService } from '../providers';

@ApiTags('Products')
@UseGuards(AuthenticatedGuard)
@Controller('product')
export class CrudController {
  constructor(private productCrud: productCrudService,
              private productService:ProductService) { }

  @ApiOkResponse({ description: 'Fetch Data Successfully' })
  @ApiNotFoundResponse({ description: 'NotFoundData! ' })
  @Get(':id')
  public async read(@Param('id', ParseUUIDPipe) id: string, @Res() res): Promise<Product> {
    const result = await this.productCrud.read(id)
    if (!result) {
      // TODO LOGS  throw new NotFoundException('');
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'NotFoundData!' });
    }
    return res
      .status(HttpStatus.OK)
      .json({ data: result });
  }

  @ApiCreatedResponse({ description: 'Created Successfully' })
  @ApiInternalServerErrorResponse({ description: 'Not Created Data! ' })
  @UseGuards(RoleGuard(Role.SELLER))
  @Post()
  public async create(@ReqUser()req, @Body() product: createProductDto, @Res() res) {
    product.user=req.userId
    const result = await this.productCrud.create(product)
    if (!result.id) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Not Created Data' });
    }
    return res
      .status(HttpStatus.CREATED)
      .json({ data: result.id, message: 'Created Successfully' });
  }

  @ApiOkResponse({ description: 'Updated Successfully' })
  @ApiBadRequestResponse({ description: 'Update Failed! ' })
  @ApiUnauthorizedResponse({description: 'Unauthorized'})
  @UseGuards(RoleGuard(Role.SELLER))
  @Put(':id')
  public async update(@ReqUser()req, @Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: updateProductDto, @Res() res) {
     const isProductOwner = await this.productService.isProductOwner(req.userId,id)
    if (isProductOwner) {
      const result = await this.productCrud.update(id, updateProductDto)
      if (!result.affected) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Update Failed' });
      }
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Updated Successfully' });
    }

    else{
      return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ error: 'UNAUTHORIZED !' });
    }
  
  }

  @ApiOkResponse({ description: 'Deleted Successfully' })
  @ApiBadRequestResponse({ description: 'Delete Failed! ' })
  @ApiUnauthorizedResponse({description: 'Unauthorized'})
  @UseGuards(RoleGuard(Role.SELLER))
  @Delete(':id')
  public async remove(@ReqUser()req,@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    const isProductOwner = await this.productService.isProductOwner(req.userId,id)
    if (!isProductOwner) {
      return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ error: 'UNAUTHORIZED !' });
    }
    const result = await this.productCrud.delete(id)
    if (!result.affected) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Delete Failed' });
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Deleted Successfully' });
  }

}


