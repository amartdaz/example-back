import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdatePasswordDto } from 'src/dtos/update-password.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    async findById(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if(!user) {
            throw new NotFoundException(`There is no user ${id}`);
        }
        return user;
    }

    async findOneByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ username });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const actualUser = await this.findOneByUsername(createUserDto.username);
        if (actualUser) {
          throw new BadRequestException('This username already exits');
        }
        const salt = await genSalt(12);
        const hashedPassword = await hash(createUserDto.password, salt);
        return await this.usersRepository.save({
          ...createUserDto,
          password: hashedPassword,
        });
    }

    async edit(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
          throw new NotFoundException(`There is no user ${id}.`);
        }
        return await this.usersRepository.save({
          ...user,
          ...updateUserDto,
        });
      }

    async changePassword(
        id: number,
        updatePasswordDto: UpdatePasswordDto,
      ): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
          throw new NotFoundException(`There is no user ${id}.`);
        }
        const salt = await genSalt(12);
        const hashedPassword = await hash(updatePasswordDto.password, salt);
        if (user.password === hashedPassword) {
          throw new BadRequestException('Yo cannot use the previous password');
        }
        return await this.usersRepository.save({
          ...user,
          password: hashedPassword,
        });
    }

    async updateLoginDate(id: number): Promise<void> {
      await this.usersRepository.update(id, { lastLogin: new Date().toJSON().split('T')[0] });
    }

    async delete(id: number, userId: number): Promise<{id: number}> {
        if (id === userId) {
          throw new BadRequestException('You cannot remove to yourself');
        }
        const user = await this.findById(id);
        if (!user) {
          throw new NotFoundException(`There is no user #${id}.`);
        }
        await this.usersRepository.remove(user);
        return { id };
    }
}