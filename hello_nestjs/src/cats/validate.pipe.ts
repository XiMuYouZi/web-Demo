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

/**
 * 让我们来看看这个代码。首先你会发现 transform() 函数是 异步 的, Nest 支持同步和异步管道。这样做的原因是因为有些 class-validator 的验证是可以异步的(Promise)
接下来请注意，我们正在使用解构赋值（从 ArgumentMetadata 中提取参数）到方法中。这是一个先获取全部 ArgumentMetadata 然后用附加语句提取某个变量的简写方式。
下一步，请观察 toValidate() 方法。当验证类型不是 JavaScript 的数据类型时，跳过验证。
下一步，我们使用 class-transformer 的 plainToClass() 方法来转换 JavaScript 的参数为可验证的类型对象。一个请求中的 body 数据是不包含类型信息的，
Class-validator 需要使用前面定义过的 DTO，就需要做一个类型转换。
最后，如前所述，这就是一个验证管道，它要么返回值不变，要么抛出异常。
 */
@Injectable()
export class ClassValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log("hit ClassValidationPipe");
    
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    console.dir(`ClassValidationPipe:${JSON.stringify(object)}`);
    console.dir(value);
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