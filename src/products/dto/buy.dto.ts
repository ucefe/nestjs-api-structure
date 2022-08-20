import { IsNumber, IsUUID, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class buyProductDto{

    @ApiProperty()
    @IsUUID()
    productId:string;

    @ApiProperty()
    @IsNumber()
    @Min(1, {
        message: 'amountOfProducts should be greater than 0',
      })
    amountOfProducts: number;
}