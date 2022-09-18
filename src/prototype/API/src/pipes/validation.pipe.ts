import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      let messages = this.buildError(errors)
      throw new ValidationException(messages, 400)
    }
    return value;
  }

  private buildError(errors) {
    const result = {};
    errors.forEach(el => {
      let prop = el.property;
      Object.entries(el.constraints).forEach(constraint => {
        result[prop] = `${constraint[1]}`;
      });
    });
    return result;
  }
}