import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { loginBody } from "./sign-in-body.swagger";
import { SignInType } from "src/common/swagger/types/sign-in/sign-in-type.swagger";
import { SignInTypeResponse } from "src/common/swagger/types/sign-in/sign-in-type-response.swagger";

export function ApiSignIn() {
  return applyDecorators(
    ApiBody({
      type: SignInType,
      examples: loginBody
    }),
    ApiResponse({ status: 200, description: 'Ok', type: SignInTypeResponse }),
  );
}