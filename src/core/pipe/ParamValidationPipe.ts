import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

class ParamException extends HttpException {
  constructor(
    message: string, //
  ) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class ParamValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorList: ValidationError[] = errors;
        errors.forEach((i) => errorList.push(...(i.children ?? [])));

        const msg = errorList.map((i) => Object.values(i.constraints ?? {}).join(";")).join(";");
        return new ParamException(msg);
      },
    });
  }
}
