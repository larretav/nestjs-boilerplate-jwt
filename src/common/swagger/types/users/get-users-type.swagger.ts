import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "./user-type.swagger";

export class GetUsersType extends UserType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;
}