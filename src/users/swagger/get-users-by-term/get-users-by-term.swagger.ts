import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiResponse } from "@nestjs/swagger";
import { GetUsersType } from "src/common/swagger/types";

export function ApiGetUsersByTerm() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiParam({ name: 'term', description: 'id | userName' }),
    ApiResponse({ status: 200, description: 'OK', type: GetUsersType }),
  );
}