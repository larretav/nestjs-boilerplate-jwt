import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";

export function ApiDeleteUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' }),
  );
}