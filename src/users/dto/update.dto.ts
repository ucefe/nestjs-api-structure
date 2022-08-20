import { IsOptional, IsString, MaxLength, MinLength, IsEnum, IsNumber } from "class-validator";
import { Role } from "src/common/enums/role.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class updateUserDto{
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(3)	
    @MaxLength(15)	
    username:string;
   
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    cost:number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(Role)
    role:Role
}