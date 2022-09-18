import {HttpException, HttpStatus} from "@nestjs/common";

export class ValidationException extends HttpException {
  public messages: [];
  public code: number = 400;
  constructor(response, code) {
    super({errors: response, code}, HttpStatus.BAD_REQUEST);
    this.messages = response
    this.code = code;
  }
}