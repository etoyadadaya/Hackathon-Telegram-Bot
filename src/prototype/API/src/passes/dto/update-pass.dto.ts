import {IsInt} from "class-validator";

export class UpdatePassDto {
  term: Date;

  @IsInt({message: "Должно быть числом"})
  readonly status: number;
}