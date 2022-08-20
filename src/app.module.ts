import { ProductsModule } from './products';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/db/db.config.service';
import { APP_PIPE, RouterModule, APP_FILTER } from '@nestjs/core';
import { UsersModule } from './users';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
import { CommonModule } from './common/common.module';
import { HttpExceptionFilter } from './common/filters/exceptions.filter';



@Module({
  imports: [   
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),ProductsModule,UsersModule,AuthModule, BaseModule,
    RouterModule.register([{
      path: 'api/v1',
      module: UsersModule
    },{
      path: 'api/v1',
      module: ProductsModule
    }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule
  ],
  providers: [
    {provide: APP_FILTER, useClass: HttpExceptionFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true, 
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    },
  ],
})
export class AppModule {}
