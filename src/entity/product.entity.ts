import { BaseEntity } from "./base/base.entity";
import { Column, Entity, ManyToMany, ManyToOne, RelationId } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'product' })
export class Product extends BaseEntity{

@Column({ type: 'varchar', length: 300 })
 productName: string;
 
 @Column({ type: 'int', width: 10})
 amountAvailable: number;

 @Column({ type: 'float', width: 10})
 cost:number;

 @ManyToOne((type) => User)
 user: User;

 @RelationId((product: Product) => product.user) // you need to specify target relation
 userId: string;

}