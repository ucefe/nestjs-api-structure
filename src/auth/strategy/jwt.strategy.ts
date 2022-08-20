import { Injectable } from "@nestjs/common";
import { JwtPayload, Payload } from "../auth.interface";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWTSECRET'),
    });
  }

  public validate(payload: JwtPayload): Payload {
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}