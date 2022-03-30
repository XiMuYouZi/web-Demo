import { Cat } from "../interfaces/cat.interface";
import { IsString, IsInt, IsNumber } from "class-validator";

export class CreateCatDto implements Cat {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly age: number;
  @IsString()
  readonly breed: string;
}

export class UpdateCatDto {}

export class ListAllEntities {
  limit: number;
}
