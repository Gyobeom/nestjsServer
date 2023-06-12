import { Inject, NotFoundException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { name, email, phone } = createUserDto;
    return await this.usersRepository.save({ name: name, email: email, phone: phone, createdAt: new Date() })
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id
      }
    });
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    await this.usersRepository.update(id, updateUserDto);
    return id;
  }
  async remove(id: number): Promise<number> {
    await this.usersRepository.delete(id);
    return id;
  }
}
