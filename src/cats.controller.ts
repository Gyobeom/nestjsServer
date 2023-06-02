import { Controller, Get, Post, Body, Bind, Dependencies } from '@nestjs/common';
import { CreateCat } from "./dto/dto";
import { CatsService } from "./cat.service";

@Controller('cats')
@Dependencies(CatsService)
export class CatsController {
  constructor(private catsService: CatsService) { }

  @Post()
  @Bind(Body())
  async create(createCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
    return this.catsService.findAll();
  }

}