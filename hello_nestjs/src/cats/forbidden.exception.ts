import * as common from  '@nestjs/common';

export class ForbiddenExceptionCustom extends common.HttpException {
    constructor() {
      super('Forbidden', common.HttpStatus.FORBIDDEN);
    }
  }