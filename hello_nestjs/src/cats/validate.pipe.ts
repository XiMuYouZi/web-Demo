import { PipeTransform, Injectable, ArgumentMetadata,BadRequestException } from "@nestjs/common";
import * as Joi from "@hapi/joi"
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`hit ValidationPipe==> ${value} `);
    return value;
  }
}


@Injectable()
export class JoiValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`hit JoiValidationPipe`)
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        age: Joi.number().required(), 
        breed:Joi.string().required()
    });

    const { error } = schema.validate(value);
    if (error) {
      throw new BadRequestException('參數類型不對！！');
    }
    return value;
  }
}

@Injectable()
export class ClassValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log("hit ClassValidationPipe");
    
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    console.dir(object);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('ClassValidationPipe failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}