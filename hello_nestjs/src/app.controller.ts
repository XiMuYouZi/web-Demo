import { Controller, Get, Req, Post,Request, HttpCode, Header,UseGuards, Redirect, Query, Body, Param, ForbiddenException } from '@nestjs/common';
import { AppService } from './app.service';
// import { Request } from 'express';
import { CreateCatDto } from "./cats/dto/dto"
import { APP_FILTER } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller('/customers')
export class AppController {
  constructor(private readonly appService: AppService,private readonly authService: AuthService) { }

  /**
   *jwt介绍： https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
   测试：
   $ # GET /profile
$ curl http://localhost:3000/profile
$ # result -> {"statusCode":401,"error":"Unauthorized"}

$ # POST /auth/login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm... }

$ # GET /profile using access_token returned from previous step as bearer code
注意：必须在头部携带 “Authorization: Bearer xxxxxx”，xxxx是token
$ curl http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
$ # result -> {"userId":1,"username":"john"}
   */
  //jwt策略默认名字就是jwt
  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  //本地策略默认名字就是local
  @UseGuards(AuthGuard('local'))
  @Post('auth/loginJwt')
  async loginJwt(@Request() req) {
    return this.authService.login(req.user);
  }

  /*
$ # POST to /auth/login
$ curl -X POST http://localhost:3000/customers/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"userId":1,"username":"john"}
  */
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    console.dir(req.body)
    return req.user;
  }
  

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
