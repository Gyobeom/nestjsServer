import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, HttpStatus } from '@nestjs/common';
import { CrawlsService } from '../service/crawls.service';
import { CreateRequestCrawlDto } from '../dto/create-crawl-request.dto';
import { UpdateCrawlDto } from '../dto/update-crawl-request.dto';
import { CreateCustomerDto } from '../dto/create-crawl-customer.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators';
import { CreateCrawlRuleDto } from '../dto/create-crawl-rule.dto';
import { CreateEngineDto } from '../dto/create-crawl-channel-engine.dto';

@ApiTags('crawl')
@Controller('crawls')
export class CrawlsController {
  constructor(private readonly crawlsService: CrawlsService) { }

  @ApiResponse({ status: 201, description: 'Input new Request' })
  @Post('request')
  async create(@Body() createCrawlDto: CreateRequestCrawlDto) {
    return await this.crawlsService.insertRequest(createCrawlDto);
  }

  @ApiResponse({ status: 201, description: 'All Request' })
  @Get('allrequests')
  async findAll() {
    return await this.crawlsService.findRequest();
  }

  @ApiResponse({ status: 201, description: 'All Progress' })
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

  @ApiResponse({ status: 201, description: 'Request Update' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCrawlDto: UpdateCrawlDto) {
    return await this.crawlsService.update(id, updateCrawlDto);
  }

  @ApiResponse({ status: 201, description: 'Progress Delete' })
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


  @ApiResponse({ status: 200, description: 'get Total Rules' })
  @Get('rule/request')
  async findRuldTotal() {
    return await this.crawlsService.findTotalRule();
  }

  @ApiResponse({ status: 200, description: 'Insert Rule' })
  @Get('rule/insert')
  async insertRule(@Body() createRule: CreateCrawlRuleDto) {
    return await this.crawlsService.insertRule(createRule);
  }

  @ApiResponse({ status: 200, description: 'Insert Engine' })
  @Get('engine/insert')
  async insertEngine(@Body() createEngine: CreateEngineDto) {
    return await this.crawlsService.insertRule(createEngine);
  }

  @Get('todayProgressTotal')
  async todayProgressTotal() {
    return await this.crawlsService.todayProgressTotal();
  }

}
