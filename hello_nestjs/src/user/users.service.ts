import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './orm/user.entity';

@Injectable()
export class UsersService {
//   constructor(
//     @InjectRepository(UserEntity)
//     private usersRepository: Repository<UserEntity>
//   ) {}

//   findAll(): Promise<UserEntity[]> {
//     return this.usersRepository.find();
//   }


// //   findOne(id: string): Promise<User> {
// //     return this.usersRepository.findOne({
// //         where: {"email":'navalkishor2005@gmail.com'}
// //     });
// //   }


//   async remove(id: string): Promise<void> {
//     await this.usersRepository.delete(id);
//   }
}
