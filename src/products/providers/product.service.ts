import { UserService } from './../../users/providers/user.service';
import { Injectable, BadRequestException } from "@nestjs/common";
import { productCrudService } from "./crud.service";
import { userCrudService } from "src/users/providers";
import { IOrder } from '../interfaces/order.interface';

@Injectable()
export class ProductService{
    constructor(private crudService:productCrudService,
                private userCrud: userCrudService,
                private userService: UserService){}

    public async isProductOwner(userId:string,productId:string): Promise<boolean>{
        const product = await this.crudService.read(productId)
        if (product && product.userId===userId) return true
        return false
    }
    
    public async buy(productId: string, amountOfProducts:number, userId:string):Promise<IOrder | void>{
        const product = await this.crudService.read(productId)
        // check availability of stock first
        if (product && product.amountAvailable>=amountOfProducts ){
            const buyer = await this.userCrud.read(userId)
            const totalSpend= product.cost*amountOfProducts
            if(buyer && buyer.deposit>= totalSpend){
                const OrderSummary={ product_name:product.productName,
                                    quantity:amountOfProducts,
                                    total_spend:product.cost*amountOfProducts,
                                    change:buyer.deposit-totalSpend}
                const newProductQty= product.amountAvailable-amountOfProducts
                await this.crudService.update(productId,{amountAvailable:newProductQty})
                await this.userService.reset(userId)
                return OrderSummary
            }
            throw new BadRequestException('insufficient deposit !')
        }
        throw new BadRequestException('insufficient stock !')
    }

}