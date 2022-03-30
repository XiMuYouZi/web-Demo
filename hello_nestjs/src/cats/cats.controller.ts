import { Controller, Get, Query, Post, Body, Put, Param, Delete,Res } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto/dto';
import { Response } from 'express';
// import { CatsService } from './cats.service';
import  * as Cat from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat.Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }


  @Post('create_express')
  create_express(@Res() res: Response) {
    res.status(200).send();
  }

  @Get('findAll/express')
  findAll_express(@Res() res: Response) {
    res.status(200).json({"ansd":12312,"sffs":"sdfsf"});
  }
}