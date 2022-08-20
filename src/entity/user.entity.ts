import { BaseEntity } from "./base/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Product } from "./product.entity";
import { Role } from "src/common/enums/role.enum";

@Entity({ name: 'user' })
export class User extends BaseEntity{

@Column({ type: 'varchar', length: 30 })
username: string;
 
@Column({ type: 'varchar', length: 100})
password: string;

@Column({ type: 'int', width: 10, default:0})
deposit:number;

@Column({ type: 'enum', enum: Role, default: Role.BUYER })
role: Role;
 
@OneToMany(() => Product,(product)=>product.user )
products: Product[];
}