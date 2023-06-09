import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity';
import { DatabaseModule } from 'database/database.module';
import { usersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...usersRepository, UsersService]
})
export class UsersModule { }
