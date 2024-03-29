import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CaslController } from './casl.controller';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
  controllers: [CaslController],
})
export class CaslModule {}