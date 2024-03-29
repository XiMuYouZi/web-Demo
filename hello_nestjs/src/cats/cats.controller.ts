import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpException,
  HttpStatus,
  ForbiddenException,
  UseGuards,
  UseInterceptors,
  Req
} from "@nestjs/common";
import * as common from "@nestjs/common";
import { CreateCatDto, UpdateCatDto, ListAllEntities } from "./dto/dto";
import { Response,Request} from "express";
import { CatsService } from "./cats.service";
import * as Cat from "./interfaces/cat.interface";
import { ForbiddenExceptionCustom } from "./forbidden.exception";
import { HttpExceptionFilter } from "./http-exception.filter";
import { JoiValidationPipe, ClassValidationPipe } from "./validate.pipe";
import { ParseIntPipe} from './parse-int.pipe'
import { Roles,Role } from "./roles.decorator";
import { RolesGuard } from "./roles.guard";
import { LoggingInterceptor } from "./logging.interceptor";
import { TransformInterceptor,ExcludeNullInterceptor,TimeoutInterceptor } from "./transform.interceptor";
import { ErrorsInterceptor } from "./exception.interceptor";
import { User,UserPara } from '../cats/user.decorator';
import { ValidationPipe } from "./validate.pipe";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('cats')
@Controller("cats")
// @UseInterceptors(LoggingInterceptor,TransformInterceptor,ErrorsInterceptor,ExcludeNullInterceptor,TimeoutInterceptor)
// @common.UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) { }


  @Get('userPipe')
async userPipe(@User(new ValidationPipe()) user: CreateCatDto) {
  console.log(user);
}

  //http://127.0.0.1:3000/cats/RoleAdmin ，只有admin能访问
  @Post('RoleAdmin')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  RoleAdmin(@Body() body: String) {
    return `RoleAdmin===> ${JSON.stringify(body)}`;
  }

    //http://127.0.0.1:3000/cats/RoleGenerinc ，admin、user都能访问能访问
  @Post('RoleGenerinc')
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(RolesGuard)
  RoleGenerinc(@Body() body: String) {
    return `RoleGenerinc===> ${JSON.stringify(body)}`;
  }

  @Get('userParaDecorator')
  async userParaDecorator(@UserPara('firstName') firstName: string) {
    console.log(`Hello ${firstName}`);
  }

  @Post('userDecorator')
  async userDecorator(@User() user: CreateCatDto) {
    console.log(`userDecorator---> ${JSON.stringify(user)}`);
  }
 

  @Get("HttpExceptionFilter")
  @common.UseFilters(HttpExceptionFilter)
  async HttpExceptionFilter(@Body() createCatDto: CreateCatDto) {
    console.log("HttpExceptionFilter");
    throw new ForbiddenException();
  }

  /*body 的JSON RAW数据{"name":"asfsadf","age":123,"breed":"sdfffsa","address":["sdfdsf","123123"]}可以通过验证
  xxx-form-data会把数字转成字符串
  */
  @Post("ClassValidationPipe")
  @common.UsePipes(ClassValidationPipe)
  async ClassValidationPipe(@Body() createCatDto: CreateCatDto) {
    console.log("post ClassValidationPipe")
    this.catsService.create(createCatDto);
    return JSON.stringify(createCatDto)
  }

  @Post("JoiValidationPipe")
  //方法级别管道
  @common.UsePipes(new JoiValidationPipe())
  //参数级别管道
  async JoiValidationPipe(@Body(new JoiValidationPipe()) createCatDto: CreateCatDto) {
    console.log("create");
    this.catsService.create(createCatDto);
    // throw new ForbiddenExceptionCustom();
  }

  @Get("findAll")
  async findAll(@Req() request: Request, @Res() response:Response): Promise<Cat.Cat[]> {
    console.log("===>findAll");
    console.dir(request)
    console.dir(response)
    return this.catsService.findAll();
  }
  @Get("fetchReqRes")
   fetchReqRes(@Req() request: Request, @Res() response:Response):string{
    console.log("===>fetchReqRes");
    console.dir(request.rawHeaders)
    console.dir(response)
    return "fetchReqRes"
  }

  @Get("findAll_exception")
  async findAll_exception() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    throw new HttpException(
      {
        status: HttpStatus.METHOD_NOT_ALLOWED,
        error: "This is a custom message",
        errorsdd: "This is a custom messagesdsd",
      },
      HttpStatus.FORBIDDEN
    );

    //抛出自定义异常
    throw new ForbiddenExceptionCustom();
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return `This action removes a #${id} cat`;
  }

  @Post("create_express")
  create_express(@Res() res: Response) {
    res.status(200).send();
  }

  @Get("findAll/express")
  findAll_express(@Res() res: Response) {
    res.status(200).json({ ansd: 12312, sffs: "sdfsf" });
  }

   /**
   * // 主路径为 home
@Controller("home")

// 1. 固定路径
// 可匹配到的访问路径：
//   http://localhost:3000/home/greeting
@Get("greeting")

// 2. 通配符路径(通配符可以有 ?, +, * 三种)
// 可匹配到的访问路径：
//   http://localhost:3000/home/say_hi
//   http://localhost:3000/home/say_hello
//   http://localhost:3000/home/say_good
//   ...
@Get("say_*")

// 3. 路径数组
// 可匹配到的访问路径：匹配上面1和2里的所有路径
@Get(["greeting", "say_*"])

// 4. 带参路径
// 可匹配到的访问路径：
//   http://localhost:3000/home/greeting/hello
//   http://localhost:3000/home/greeting/good-morning
//   http://localhost:3000/home/greeting/xxxxx
//   ...
@Get("greeting/:words")
   */
  //http://127.0.0.1:3000/cats/13123
  @Get(":findOne")
  async findOne(@Param("findOne", ParseIntPipe) findOne) {
    return `findOne===> ${findOne}`;
  }
}
