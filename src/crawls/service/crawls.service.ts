import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRequestCrawlDto } from '../dto/create-crawl-request.dto';
import { UpdateCrawlDto } from '../dto/update-crawl-request.dto';
import { TbCrawlProgress } from '../entities/TbCrawlProgress'
import { TbCrawlRequest } from '../entities/TbCrawlRequest';
import { CrawlsRepository } from '../repository/crawls.repository';
import { CreateCustomerDto } from '../dto/create-crawl-customer.dto';
import { CreateEngineDto } from '../dto/create-crawl-channel-engine.dto';
import { TbCustomer } from '../entities/TbCustomer';
import { TbCrawlRule } from '../entities/TbCrawlRule';
import { getServiceBusQueueCount, getBlobCount, getQueueCount } from '../azure/azure_count'
import { CreateCrawlRuleDto } from '../dto/create-crawl-rule.dto';

@Injectable()
export class CrawlsService {
  constructor(
    private crawlRepository: CrawlsRepository
  ) { }

  async insertRequest(createCrawlDto: CreateRequestCrawlDto) {
    return await this.crawlRepository.insertRequest(createCrawlDto);
  }

  async findRequest(): Promise<TbCrawlRequest[]> {
    return await this.crawlRepository.findRequest();
  }

  async findProgress(): Promise<TbCrawlProgress[]> {
    return await this.crawlRepository.findProgress();

  }

  async findProgressCustomerCount(id: number) {
    return await this.crawlRepository.findProgressCustomerCount(id);
  }

  async findProgressCustomer(id: number) {
    return await this.crawlRepository.findProgressCustomer(id);
  }

  async update(id: string, updateCrawlDto: UpdateCrawlDto) {
    const temp_data = await this.crawlRepository.update(id, updateCrawlDto);
    if (temp_data.affected === 0) {
      throw new BadRequestException('Not Found Request Data', { cause: new Error(), description: 'Not Found Request Data' })
    }
    return temp_data
  }

  async remove(id: string) {
    return await this.crawlRepository.remove(id);
  }
  async insertCustomer(createCustomer: CreateCustomerDto) {
    return await this.crawlRepository.insertCustomer(createCustomer);
  }
  async findCustomertotal() {
    return await this.crawlRepository.findCustomerTotal();
  }

  async getServiceBusQueueCount(queueName: string) {
    return await this.crawlRepository.getServiceBusQueueCount(queueName);
  }

  async getBlobCount(queueName: string) {
    return await this.crawlRepository.getBlobCount(`${queueName}/`);

  }

  async getQueueCount(queueName: string) {
    return await this.crawlRepository.getQueueCount(queueName);
  }

  async findProgressErrorCustomer(id: number) {
    return await this.crawlRepository.findProgressErrorCount(id);
  }

  async findTotalRule() {
    return await this.crawlRepository.findTotalRule();
  }

  async insertRule(createRule: CreateCrawlRuleDto) {
    const rule_seq = await this.crawlRepository.insertRule(createRule);
    if (rule_seq.identifiers[0].seq > 0)
      return rule_seq.identifiers[0].seq
  }

  async insertEngine(createEngine: CreateEngineDto) {
    return await this.crawlRepository.insertEngine(createEngine);
  }

  async yearProgressTotal() {
    return await this.crawlRepository.yearProgressTotal();
  }

}
