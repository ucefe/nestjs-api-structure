import { AuthService } from './../../auth/auth.service';
import { Controller, Post, UseGuards, Req, Session, Res, Get } from '@nestjs/common';
import { Payload, JwtSign } from 'src/auth/auth.interface';
import { LocalLoginGuard, LocalAuthGuard } from 'src/auth/guards';
import { ReqUser } from 'src/common/decorators/req-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { callbackify } from 'util';

@ApiTags('Authentication')
@Controller()
export class Authontroller {
    constructor(private authService: AuthService){}
    
    @Post('login')
    @UseGuards(LocalLoginGuard)
    public login(@Req()req, @ReqUser() user: Payload, @Res()res) {
      res.send(user)
      // if (req.session.views) {
      //   req.session.views++
      // }

      // else {
      //   req.session.views = 1
      //   res.end('welcome to the session demo. refresh!')
      // }
    }

    @Get('logout')
    public logout(@Req() req, @Res() res): void {
      req.logout(() => {
        res.send(' logout successfullty !!');
      });
    }

// @UseGuards(LocalAuthGuard)
//   @Post('jwt/login')
//   public jwtLogin(@ReqUser() user: Payload): JwtSign {
//     return this.authService.jwtSign(user);
//   }


}
