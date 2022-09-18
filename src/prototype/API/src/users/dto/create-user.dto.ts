import {IsString, IsInt} from "class-validator";

export class CreateUserDto {
  @IsInt({message: "Должно быть числом"})
  readonly uid: number;

  @IsString({message: "Должно быть строкой"})
  readonly first_name: string;

  @IsString({message: "Должно быть строкой"})
  readonly middle_name: string;

  @IsString({message: "Должно быть строкой"})
  readonly last_name: string;

  @IsString({message: "Должно быть строкой"})
  readonly city: string;
}