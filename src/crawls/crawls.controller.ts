import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CrawlsService } from './crawls.service';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';

@Controller('crawls')
export class CrawlsController {
  constructor(private readonly crawlsService: CrawlsService) { }

  @Post()
  create(@Body() createCrawlDto: CreateCrawlDto) {
    return this.crawlsService.create(createCrawlDto);
  }

  @Get()
  findAll() {
    return this.crawlsService.findAll();
  }

  @Get('data/:id')
  async findOne(@Param('id') id: number) {
    console.log(id);
    return await this.crawlsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrawlDto: UpdateCrawlDto) {
    return this.crawlsService.update(+id, updateCrawlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crawlsService.remove(+id);
  }
}
