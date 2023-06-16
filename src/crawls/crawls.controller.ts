import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CrawlsService } from './crawls.service';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators';

@ApiTags('crawl')
@Controller('crawls')
export class CrawlsController {
  constructor(private readonly crawlsService: CrawlsService) { }

  @Post()
  async create(@Body() createCrawlDto: CreateCrawlDto) {
    return await this.crawlsService.insertRequest(createCrawlDto);
  }

  @ApiResponse({ status: 201, description: 'The record has been successfully returned' })
  @Get('allrequests')
  findAll() {
    return this.crawlsService.findRequest();
  }

  @ApiResponse({ status: 201, description: 'The record has been successfully returned' })
  @Get('allprogress')
  async findProgress() {
    return this.crawlsService.findProgress();
  }

  @ApiResponse({ status: 201, description: 'Return progress count' })
  @Get('progresscnt/customer/:id')
  async findProgressCustomerCount(@Param('id') id: number) {
    return this.crawlsService.findProgressCustomerCount(id);
  }

  @ApiResponse({ status: 201, description: 'Return progress' })
  @Get('progress/customer/:id')
  async findProgressCustomer(@Param('id') id: number) {
    return this.crawlsService.findProgressCustomer(id);
  }

  @ApiResponse({ status: 201, description: 'The record has been successfully updated' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCrawlDto: UpdateCrawlDto) {
    return await this.crawlsService.update(id, updateCrawlDto);
  }

  @ApiResponse({ status: 201, description: 'The record has been successfully deleted' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.crawlsService.remove(id);
  }
}
