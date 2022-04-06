import * as common from '@nestjs/common';
import { UserEntity } from './orm/user.entity';
import { UsersService } from './users.service';

@common.Controller('/user')
export class UserController {
    constructor(private readonly usersService: UsersService) { }

    @common.Post("findAll")
    findAll(): Promise<UserEntity[]> {
        return this.usersService.findAll();
    }
}