import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '#entity/index';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { createProductDto } from '../dto';

@Injectable()
export class productCrudService {
    constructor(@InjectRepository(Product) private table : Repository<Product>){}

    public async create(product: Partial<Product>):Promise<Product>{
        return this.table.save(product)
    }

    public async read(id:string): Promise<Product| null>{
        return this.table.findOneBy({ id })
    }

    public async update(id:string,product: Partial<Product>): Promise<UpdateResult>{
        return this.table.update(id,product)
    }

    public async delete(id:string): Promise<DeleteResult>{
        return this.table.softDelete(id)
    }

}
