import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CrawlsService } from '../service/crawls.service';
import { CreateCrawlDto } from '../dto/create-crawl.dto';
import { UpdateCrawlDto } from '../dto/update-crawl.dto';
import { CreateCustomerDto } from '../dto/create-crawl-customer.dto';
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
  async findAll() {
    return await this.crawlsService.findRequest();
  }

  @ApiResponse({ status: 201, description: 'The record has been successfully returned' })
  @Get('allprogress')
  async findProgress() {
    return await this.crawlsService.findProgress();
  }

  @ApiResponse({ status: 201, description: 'Return progress count' })
  @Get('progresscnt/customer/:id')
  async findProgressCustomerCount(@Param('id') id: number) {
    return await this.crawlsService.findProgressCustomerCount(id)

  }

  @ApiResponse({ status: 201, description: 'Return progress' })
  @Get('progress/customer/:id')
  async findProgressCustomer(@Param('id') id: number) {
    return await this.crawlsService.findProgressCustomer(id);
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
  @ApiResponse({ status: 200, description: 'Insert Customer' })
  @Post('insert/customer')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.crawlsService.insertCustomer(createCustomerDto)
  }

  @ApiResponse({ status: 200, description: 'Find Customer' })
  @Get('customer/findall')
  async findCustomertotal() {
    return await this.crawlsService.findCustomertotal()
  }

  @ApiResponse({ status: 200, description: 'Find ServiceBusQueue Count' })
  @Get('servicebus/cnt/:id')
  async getServiceBusQueueCount(@Param('id') id: string) {
    return await this.crawlsService.getServiceBusQueueCount(id);
  }

  @ApiResponse({ status: 200, description: 'Find Blob Count' })
  @Get('blob/cnt/:id')
  async getBlobCount(@Param('id') id: string) {
    return await this.crawlsService.getBlobCount(id);
  }

  @ApiResponse({ status: 200, description: 'Find Request Queue Count' })
  @Get('queue/cnt/:id')
  async getQueueCount(@Param('id') id: string) {
    return await this.crawlsService.getQueueCount(id);
  }

  @ApiResponse({ status: 200, description: 'Find Progress Error Count' })
  @Get('progress/errorCnt/:id')
  async findProgressCustomerErrorCount(@Param('id') id: number) {
    return await this.crawlsService.findProgressErrorCustomer(id);
  }
}
