import { ApiProperty } from "@nestjs/swagger";
import { SignInDto } from "src/auth/dto/sign-in.dto";

export class SignInType implements SignInDto {
  @ApiProperty()
  userName: string;
  
  @ApiProperty()
  password: string;

}