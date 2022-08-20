import { UserService } from './../providers/user.service';
import { Controller, Get, Param, ParseUUIDPipe, HttpStatus, Post, Put, Delete, Res, Body, UseGuards, UnauthorizedException, ConflictException, HttpException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { userCrudService } from '../providers';
import { createUserDto, updateUserDto } from '../dto';
import { AuthenticatedGuard } from 'src/auth/guards';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiUnauthorizedResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ReqUser } from 'src/common/decorators';

@ApiTags('Users')
@Controller('user')
export class CrudController {
    constructor(private userCrud: userCrudService,
                private userService: UserService
              ){}


    @ApiOkResponse({ description: 'Fetch Data Successfully' })
    @ApiNotFoundResponse({ description: 'NotFoundData! ' })
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    public async read(@ReqUser()req, @Param('id',ParseUUIDPipe) id: string, @Res() res) {
      if(req.userId!==id) {
      return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ error: 'UNAUTHORIZED !' });
    }
        const result = await this.userCrud.read(id)
        if (!result) {
          // TODO add logs
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({error: 'NotFoundData!' });
          }
          return  res
          .status(HttpStatus.OK)
          .json({ data: result});
        }

    @ApiCreatedResponse({ description: 'Created Successfully' })
    @ApiInternalServerErrorResponse({ description: 'Not Created Data! ' })
    @Post()
    public async create(@Body() user: createUserDto, @Res() res){
        const userExist = await this.userService.findByUsername(user.username)
        if(userExist){
          throw new HttpException(' Username exists !!',HttpStatus.NOT_ACCEPTABLE)
        }
        const result = await this.userCrud.create(user)
        if(!result.id){
            return  res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({error :'Not Created Data'});
        }
        return  res
          .status(HttpStatus.CREATED)
          .json({ message:'Created Successfully You Can Login NOW !!'});
    }

    @ApiOkResponse({ description: 'Updated Successfully' })
    @ApiBadRequestResponse({ description: 'Update Failed! ' })
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @UseGuards(AuthenticatedGuard)
    @Put(':id')
    public async update(@ReqUser()req,@Param('id',ParseUUIDPipe) id:string, @Body() updateUserDto : updateUserDto,@Res() res){
      if(req.userId!==id) {
        return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: 'UNAUTHORIZED !' });
      }
        const result = await this.userCrud.update(id,updateUserDto)
        if(!result.affected){
            return  res
            .status(HttpStatus.BAD_REQUEST)
            .json({error :'Update Failed'});
        }
        return  res
          .status(HttpStatus.CREATED)
          .json({ message:'Updated Successfully'});
    }

    @ApiOkResponse({ description: 'Deleted Successfully' })
    @ApiBadRequestResponse({ description: 'Delete Failed! ' })
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @UseGuards(AuthenticatedGuard)
    @Delete(':id')
    public async remove(@ReqUser()req,@Param('id',ParseUUIDPipe) id:string,@Res() res){
      if(req.userId!==id) {
        return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: 'UNAUTHORIZED !' });
      }
        const result = await this.userCrud.delete(id)
        if(!result.affected){
            return  res
            .status(HttpStatus.BAD_REQUEST)
            .json({error :'Delete Failed'});
        }
        return  res
          .status(HttpStatus.OK)
          .json({ message:'Deleted Successfully'});
    }
}
