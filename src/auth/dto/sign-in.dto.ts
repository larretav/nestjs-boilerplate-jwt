import { IsString, MinLength } from "class-validator";

export class SignInDto{

  @IsString({message: '[username] debe ser un string'})
  @MinLength(1, {message: 'La longitud de [username] debe ser mayor a 1'})
  userName: string;

  @IsString({ message: '[password] debe ser un string' })
  @MinLength(1, { message: 'La longitud de [password] debe ser mayor a 1' })
  password: string;
}