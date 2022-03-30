import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    console.log(`hit ParseIntPipe ${value}`)
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('ParseIntPipe failed');
    }
    return val;
  }
}