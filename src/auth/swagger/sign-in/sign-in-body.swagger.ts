import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const loginBody: ExamplesObject = {
  "Example Body Login": {
    value: {
      userName: "usuario",
      password: "usuario123"
    }
  }
}