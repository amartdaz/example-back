import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { GetUserId } from 'src/decorators/user.decorator';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdatePasswordDto } from 'src/dtos/update-password.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10);
    return await this.usersService.findById(userId);
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return await this.usersService.create(createUserDto);
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userId = parseInt(id, 10);
    return await this.usersService.edit(userId, updateUserDto);
  }

  @Put(':id/update-password')
  async editPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const userId = parseInt(id, 10);
    return await this.usersService.changePassword(userId, updatePasswordDto);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @GetUserId() userId: string,
  ): Promise<{ id: number }> {
    const deleteUserId = parseInt(id, 10);
    const callUserId = parseInt(userId, 10);
    return await this.usersService.delete(deleteUserId, callUserId);
  }
}
