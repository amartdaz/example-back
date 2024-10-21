import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { LoginRequestDto, LoginResponseDto } from 'src/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findOneByUsername(username);
      if (
        user && (await compare(password, user.password))
      ) {
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(loginRequestDto.username, loginRequestDto.password);
    if (!user) {
      throw new UnauthorizedException('Wrong username or password.');
    }
    await this.usersService.updateLoginDate(user.id);
    const token = this.jwtService.sign({ ...user });
    const response = {
      user: {
        id: user.id,
        username: user.name,
        name: user.name,
        surname: user.surname,
        lastLogin: user.lastLogin,
      },
      token: token,
    };
    return response;
  }
}