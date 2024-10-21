import { IsDefined, IsString, Min } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {
  @IsDefined()
  @IsString()
  @Min(6)
  username: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  surname: string;
}