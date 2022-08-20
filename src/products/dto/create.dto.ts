import {
    IsString,
    IsOptional,
    IsJSON,
    IsInt,
    ValidationArguments,
    IsDivisibleBy,
    IsUUID,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '#entity/user.entity';

export class createProductDto{

    @ApiProperty()
    @IsString()
    productName:string;
    
    @ApiProperty()
    @IsInt()
    amountAvailable: number;

    @ApiProperty()
    @IsDivisibleBy(5)
    cost:number;
  
    user:User

}