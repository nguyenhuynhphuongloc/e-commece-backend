import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string; // raw password

  @IsOptional()
  @IsString()
  role?: string; // mặc định là "client"

  @IsOptional()
  @IsString()
  account_type?: string; // mặc định là "basic"

  @IsOptional()
  @IsString()
  name?: string;
}
