import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { UserEntity } from './orm/user.entity';
import { MessageEntity } from './orm/message.entity';
@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity,MessageEntity])],
  // providers: [UsersService],
  // controllers: [UserController],
})
export class UsersModule {}
