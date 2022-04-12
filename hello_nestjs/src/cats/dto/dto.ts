import { Cat } from "../interfaces/cat.interface";
import { IsString, IsInt, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from "../../user/orm/user.entity"; 
import { MessageEntity } from "../../user/orm/message.entity";
import { getSchemaPath,ApiExtraModels} from "@nestjs/swagger";


type Pet = UserEntity | MessageEntity;

@ApiExtraModels(UserEntity)
@ApiExtraModels(MessageEntity)
export class CreateCatDto implements Cat {
  @IsString()
  @ApiProperty()
  readonly name: string;
  
  @IsNumber()
  @ApiProperty({
    description: 'The age of a cat',
    minimum: 1,
    default: 1,
    maximum:123
  })
  readonly age: number;

  @IsString()
  @ApiProperty()
  readonly breed: string;

  @ApiProperty({ type: [String] })
  address: string[];


// @ApiProperty({
//   type: 'array',
//   items: {
//     oneOf: [
//       { $ref: getSchemaPath(UserEntity) },
//       { $ref: getSchemaPath(MessageEntity) },
//     ],
//   },
// })
// pets: Pet[];

}

export class UpdateCatDto {}

export class ListAllEntities {
  limit: number;
}
