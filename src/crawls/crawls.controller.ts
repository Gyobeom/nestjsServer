import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CrawlsService } from './crawls.service';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';

@Controller('crawls')
export class CrawlsController {
  constructor(private readonly crawlsService: CrawlsService) { }

  @Post()
  async create(@Body() createCrawlDto: CreateCrawlDto) {
    return await this.crawlsService.insertRequest(createCrawlDto);
  }

  @Get()
  findAll() {
    return this.crawlsService.findAll();
  }

  @Get('progress')
  async findProgress() {
    return this.crawlsService.findProgress();
  }

  @Get('progress/cnt')
  async findProgressCount() {
    return this.crawlsService.findProgressCount();
  }

  @Get('progress/customer/:id')
  async findProgressCustomer(@Param('id') id: number) {
    return this.crawlsService.findProgressCustomer(id);
  }

  @Get('data/:id')
  async findOne(@Param('id') id: number) {
    console.log(id);
    return await this.crawlsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCrawlDto: UpdateCrawlDto) {
    return await this.crawlsService.update(id, updateCrawlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crawlsService.remove(+id);
  }
}
