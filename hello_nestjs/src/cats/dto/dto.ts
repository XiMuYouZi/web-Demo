import { Cat } from "../interfaces/cat.interface";
import { IsString, IsInt, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto implements Cat {
  @IsString()
  @ApiProperty()
  readonly name: string;
  
  @IsNumber()
  @ApiProperty()
  readonly age: number;

  @IsString()
  @ApiProperty()
  readonly breed: string;
}

export class UpdateCatDto {}

export class ListAllEntities {
  limit: number;
}
