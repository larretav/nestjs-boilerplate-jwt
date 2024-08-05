import { BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common";

export class HandleExceptions {
  private readonly logger = new Logger();

  handleExceptions(error: any) {
    console.log(error);
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    if (error.code == "ER_DUP_ENTRY")
      throw new BadRequestException('El elemento ya existe');

    throw error
  }
}