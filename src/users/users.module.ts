import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'database/database.module';
import { usersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...usersRepository, UsersService]
})
export class UsersModule { }
