import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users';
import { JwtStrategy, JwtVerifyStrategy, LocalStrategy } from './strategy';
import { AuthSerializer } from './auth.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    UsersModule,
    PassportModule.register({session:true}),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWTSECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService,JwtStrategy,JwtVerifyStrategy,LocalStrategy,AuthSerializer],
  exports: [AuthService]

})
export class AuthModule {}
