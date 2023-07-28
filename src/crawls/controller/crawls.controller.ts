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

  @ApiResponse({ status: 201, description: 'Return progress count by Mode Name' })
  @Get('progresscnt/customer/:id')
  async findProgressbyModeName(@Param('id') id: string) {
    return await this.crawlsService.findProgressbyModeName(id)

  }

  @ApiResponse({ status: 201, description: 'Return progress' })
  @Get('progress/customer/:id')
  async findProgressCustomer(@Param('id') id: number) {
    return await this.crawlsService.findProgressCustomer(id);
  }

  @ApiResponse({ status: 201, description: 'Request Update' })
  @Patch('request/update/:id')
  async RequestUpdate(@Param('id') id: number, @Body() updateCrawlDto: UpdateCrawlDto) {
    return await this.crawlsService.RequestUpdate(id, updateCrawlDto);
  }

  @ApiResponse({ status: 201, description: 'Request Delete' })
  @Delete('request/delete/:id')
  async remove(@Param('id') id: number) {
    return await this.crawlsService.RequestRemove(id);
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

  @ApiResponse({ status: 200, description: 'Find Progress Error Count by Customer Name' })
  @Get('progress/errorCnt/:id')
  async findProgressErrorCntByCustomerName(@Param('id') id: number) {
    return await this.crawlsService.findProgressErrorCntByCustomerName(id);
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

  @ApiResponse({ status: 200, description: 'Get After today Mode Progress' })
  @Get('todayProgressTotal')
  async todayProgressTotal() {
    return await this.crawlsService.todayProgressTotal();
  }

  @ApiResponse({ status: 200, description: 'Get Mode Name , Mode - progressCnt, ProgressErrCnt' })
  @Get('customerRequestTotal/:id')
  async customerRequestTotal(@Param('id') id: string) {
    return await this.crawlsService.customerRequestTotal(id);
  }

  @ApiResponse({ status: 200, description: 'Get All Request By Customer Name' })
  @Get('allRequest/customerName/:id')
  async findRequestbyCustomerName(@Param('id') id: string) {
    return await this.crawlsService.findRequestbyCustomerName(id);
  }

  @ApiResponse({ status: 200, description: 'Get All Request By Mode Name' })
  @Get('allRequest/modeName/:id')
  async findRequestbyModeName(@Param('id') id: string) {
    return await this.crawlsService.findRequestbyModeName(id);
  }
}
