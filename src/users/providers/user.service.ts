import { User } from 'src/entity';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { userCrudService } from './crud.service';

@Injectable()
export class UserService{
    constructor(@InjectRepository(User)private table: Repository<User>,
                private crudService:userCrudService){}

    public async findByUsername(username:string):Promise<User | null>{
        return this.table.findOne({ where: {username:username} });
            }

    public async deposit(id:string,coin:number):Promise<UpdateResult>{
            const buyer = await this.crudService.read(id)
            buyer.deposit+=coin
            return this.crudService.update(id,buyer)
    }

    public async reset(id:string):Promise<UpdateResult>{
        return this.crudService.update(id,{deposit:0})
    }
}
