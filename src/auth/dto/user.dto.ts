import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class LoginDto extends CreateUserDto {}

// export class LoginDto {
//   @IsNotEmpty()
//   @IsString()
//   username: string;

//   @IsNotEmpty()
//   @IsString()
//   password: string;
// }