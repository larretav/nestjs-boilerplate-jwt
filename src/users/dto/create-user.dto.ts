import { Type } from "class-transformer";
import { IsArray, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";

export class CreateUserDto {
  
  @IsNotEmpty({message: '[firstName] no debe ser vacío.'})
  @IsString({ message: '[firstName] debe ser un string.' })
  @MaxLength(50, { message: 'La longitud máxima de [name] es de 50 caracteres.' })
  firstName: string;

  @IsNotEmpty({message: '[lastName] no debe ser vacío.'})
  @IsString({ message: '[lastName] debe ser un string.' })
  @MaxLength(50, { message: 'La longitud máxima de [lastName] es de 50 caracteres.' })
  lastName: string;

  @IsNotEmpty({message: '[email] no debe ser vacío.'})
  @IsEmail({}, { message: '[email] no tiene un formato válido.' })
  @MaxLength(50, { message: 'La longitud máxima de [email] es de 50 caracteres.' })
  email: string;

  @IsNotEmpty({message: '[userName] no debe ser vacío.'})
  @IsString({ message: '[userName] debe ser un string.' })
  @MinLength(4, { message: 'La longitud de [userName] debe ser mayor a 4.' })
  userName: string;

  @IsNotEmpty({message: '[password] no debe ser vacío.'})
  @IsString({ message: '[password] debe ser un string.' })
  @MinLength(8, { message: 'La longitud de [password] debe ser mayor a 8.' })
  @MaxLength(45, { message: 'La longitud máxima de [password] es de 45 caracteres.' })
  password: string;

  @IsOptional()
  @IsIn(['user', 'admin'], { message: '[role] debe ser user o admin' })
  role?: string;

}







