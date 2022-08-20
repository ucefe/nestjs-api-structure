import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { Product } from '#entity/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as controllers from './controllers'
import * as providers from './providers'

@Module({

  imports: [TypeOrmModule.forFeature([Product]),UsersModule],
  controllers: Object.values(controllers),
  providers: Object.values(providers),

})
export class ProductsModule {}
