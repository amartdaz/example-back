import { Controller, Post, Request } from '@nestjs/common';
import { Request as eRequest } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginRequestDto, LoginResponseDto } from 'src/dtos/login.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Request() req: eRequest): Promise<LoginResponseDto> {
    const response = await this.authService.login(req.body as LoginRequestDto);
    return response;
  }
}