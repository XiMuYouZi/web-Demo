import { Controller, Get, Req, Post, HttpCode, Header, Redirect, Query, Body, Param, ForbiddenException } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { CreateCatDto } from "./cats/dto/dto"
import { APP_FILTER } from '@nestjs/core';

@Controller('/customers')
export class AppController {
  constructor(private readonly appService: AppService) { }

 

  @Get('profile')
  getHello(@Req() request: Request): string {
    // console.log(request);
    return this.appService.getHello();
  }

  @Post()
  create(): Object {
    return { ssss: 123, sfsf: 'sfsdfdsf', fdfd: [1, 2, 3, 4] };
  }

  @Get('a*bc')
  @HttpCode(205)
  @Header('Cache-Control', 'none')
  @Redirect('https://nestjs.com')
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('docs')
  @Redirect('https://www.baidu.com', 302)
  getDocs(@Query('version') version, @Body("sdsd") sd) {
    console.log(version);
    if (version == 5) {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  //http://127.0.0.1:3000/customers/1
  @Get('/:id')
  findOne(@Param() params): string {
    return `This action returns a #${JSON.stringify(params)} cat`;
  }

  @Get('promise')
  async testPromise(): Promise<number[]> {
    throw new ForbiddenException()
    return [1, 2, 3, 4];
  }

  @Post('CreateCatDto')
  CreateCatDto(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto)
    return 'This action adds a new cat';
  }

}
