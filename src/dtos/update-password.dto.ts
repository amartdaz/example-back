import { IsAlphanumeric, IsDefined, IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
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
}