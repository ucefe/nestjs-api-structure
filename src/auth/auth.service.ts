import { ConfigService } from '@nestjs/config';
import { UserService } from './../users/providers';
import { Injectable } from '@nestjs/common';
import { Payload, JwtPayload, JwtSign } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '#entity/index';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
        private jwt: JwtService,
        private config: ConfigService) { }

    public async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userService.findByUsername(username)
        if (user && await bcrypt.compare(password, user.password)) {
            // todo validate if multiple login with same credentials 
            const { password: pass, ... result} = user;
            return user;
        }
        return null;
    }

    public jwtSign(data: Payload): JwtSign {
        const payload: JwtPayload = { sub: data.userId, username: data.username, role: data.role };
        return {
            access_token: this.jwt.sign(payload),
            refresh_token: this.getRefreshToken(payload.sub),
        };
    }

    private getRefreshToken(sub: string): string {
        return this.jwt.sign({ sub }, {
            secret: this.config.get('jwtRefreshSecret'),
            expiresIn: '7d', // Set greater than the expiresIn of the access_token
        });
    }


}
