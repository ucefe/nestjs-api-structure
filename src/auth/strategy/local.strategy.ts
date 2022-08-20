import { Role } from 'src/common/enums/role.enum';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Payload } from '../auth.interface';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<Payload> {
    const user = await this.auth.validateUser(username, password);
   if (!user) {
     throw new UnauthorizedException('NotFoundUser');
   }
   return { userId: user.id, username: user.username, role: user.role };
 }
 
}