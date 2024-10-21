import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const createUserBody: ExamplesObject = {
  "Example Body Request": {
    value: {
      firstName: "Usuario Prueba",
      lastName: "Usuario",
      email: "userprueba@gmail.com",
      userName: "usuario",
      password: "usuario123",
      role: "user"
    }
  }
}