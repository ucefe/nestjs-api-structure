import { Role } from "src/common/enums/role.enum";
import { IsString, IsNumber, IsOptional, IsEnum, MinLength, MaxLength, IsIn } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export const DEPOSIT_COINS:Array<number>=[5,10,20,50,100]
export class createUserDto{

    @ApiProperty()
    @IsString()
    @MinLength(3)	
    @MaxLength(15)	
    username:string;
   
    @ApiProperty()
    @IsString()
    @MinLength(8)	
    password:string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @IsIn(Object.values(DEPOSIT_COINS))
    deposit:number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(Role)
    role:Role
}