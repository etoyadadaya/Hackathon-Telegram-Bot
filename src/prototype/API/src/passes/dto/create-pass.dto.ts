import {IsDateString, IsInt, IsString} from "class-validator";

export class CreatePassDto {
  @IsDateString({}, {message: "Должно быть датой"})
  readonly date: Date;

  @IsInt({message: "Должно быть числом"})
  readonly userId: number;

  @IsString({message: "Должно быть строкой"})
  readonly city: string;
}