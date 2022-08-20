import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, ValidationArguments } from "class-validator";

export class updateProductDto{
   
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    productName:string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    amountAvailable: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt({
        message : (args: ValidationArguments) => {
            if(args.value%5!==0) return 'cost should be multiple of 5'
    
        }
    })
    cost:number;
}