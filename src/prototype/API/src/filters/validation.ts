import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from "@nestjs/common";
import {ValidationError, ForeignKeyConstraintError} from "sequelize";

@Catch(ValidationError, ForeignKeyConstraintError)
export class Validation implements ExceptionFilter {
  public catch(err: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    if (err instanceof ValidationError) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        errors: {
          "uid": "Пользователь с таким uid уже существует"
        },
        code: 400
      });
    } else if (err instanceof ForeignKeyConstraintError) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        errors: {
          "id": "Пользователя с таким id не существует"
        },
        code: 400
      });
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errors: "Внутренняя ошибка сервера",
        code: 500
      });
    }
  }
}