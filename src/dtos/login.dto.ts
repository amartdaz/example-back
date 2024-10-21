import { IsDefined, IsString, Min } from 'class-validator';

export class LoginRequestDto {
  @IsDefined()
  @IsString()
  @Min(6)
  username: string;

  @IsDefined()
  @IsString()
  @Min(8)
  password: string;
}

export class LoginResponseDto {
    user: {
      id: number;
      username: string;
      name: string;
      surname: string;
      lastLogin: Date;
    };
    token: string;
  }