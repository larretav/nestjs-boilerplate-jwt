import { ApiProperty } from "@nestjs/swagger";

export class SignInTypeResponse {
  @ApiProperty()
  access_token: string
}