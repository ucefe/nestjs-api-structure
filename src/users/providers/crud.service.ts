import { User } from 'src/entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class userCrudService {
    constructor(@InjectRepository(User) private table : Repository<User>){}

    public async create(user: Partial<User>):Promise<User>{
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return this.table.save({...user, password:hashedPassword})
    }

    public async read(id:string): Promise<User| null>{
        return this.table.findOneBy({id})
    }

    public async update(id:string,user: Partial<User>): Promise<UpdateResult>{
        return this.table.update(id,user)
    }

    public async delete(id:string): Promise<DeleteResult>{
        return this.table.softDelete(id)
    }
}
