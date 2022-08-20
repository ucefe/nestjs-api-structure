import { UserService } from './../providers';
import { Controller, Post, Body, Res, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { ReqUser, Roles } from 'src/common/decorators';
import { AuthenticatedGuard, LocalLoginGuard } from 'src/auth/guards';
import { Role } from 'src/common/enums/role.enum';
import { depositDto } from '../dto';
import RoleGuard from 'src/common/guards/role.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Deposit / Reset')
@Controller()
export class DepositController {

    constructor(private userService:UserService){}
    
    @UseGuards(RoleGuard(Role.BUYER))   
    @Post('deposit')
    public async deposit(@ReqUser() user, @Body() coin: depositDto, @Res() res){
        const result = await this.userService.deposit(user.userId,coin.deposit)
        if(!result.affected){
            return  res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({error :'Not deposited'});
        }
        return  res
          .status(HttpStatus.CREATED)
          .json({ message:'deposit successfully!!'});
    }

    @UseGuards(RoleGuard(Role.BUYER))   
    @Post('reset')
    public async reset(@ReqUser() user, @Res() res){
        console.log(user.userId);
        const result = await this.userService.reset(user.userId)
        if(!result.affected){
            return  res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({error :'Error Reset'});
        }
        return  res
          .status(HttpStatus.CREATED)
          .json({ message:'Reset successfully!!'});
    }
}
