import { AuthModule } from './../auth/auth.module';
import { Module, HttpModule } from '@nestjs/common';
import * as controllers from './controllers'

@Module({ 

    imports:[AuthModule,HttpModule],
    controllers: Object.values(controllers)

})
export class BaseModule {}
