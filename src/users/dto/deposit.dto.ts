import { DEPOSIT_COINS } from './create.dto';
import { IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class depositDto{
    
    @ApiProperty()
    @IsNumber()
    @IsIn(Object.values(DEPOSIT_COINS))
    deposit:number;
}