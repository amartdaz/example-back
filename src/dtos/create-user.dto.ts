import {
    IsAlphanumeric,
    IsDefined,
    IsString,
    IsStrongPassword,
    Min,
  } from 'class-validator';

export class CreateUserDto {
    @IsDefined()
    @IsString()
    @Min(6)
    username: string;
  
    @IsDefined()
    @IsString()
    @IsAlphanumeric('es-ES')
    @IsStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
    })
    password: string;
  
    @IsDefined()
    @IsString()
    name: string;
  
    @IsDefined()
    @IsString()
    surname: string;
  }