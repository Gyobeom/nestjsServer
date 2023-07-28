import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRequestCrawlDto } from '../dto/create-crawl-request.dto';
import { UpdateCrawlDto } from '../dto/update-crawl-request.dto';
import { TbCrawlProgress } from '../entities/TbCrawlProgress'
import { TbCrawlRequest } from '../entities/TbCrawlRequest';
import { CrawlsRepository } from '../repository/crawls.repository';
import { CreateCustomerDto } from '../dto/create-crawl-customer.dto';
import { CreateEngineDto } from '../dto/create-crawl-channel-engine.dto';
import { CreateCrawlRuleDto } from '../dto/create-crawl-rule.dto';

@Injectable()
export class CrawlsService {
  constructor(
    private crawlRepository: CrawlsRepository
  ) { }

  async insertRequest(createCrawlDto: CreateRequestCrawlDto) {
    return await this.crawlRepository.insertRequest(createCrawlDto);
  }


  async findProgress(): Promise<TbCrawlProgress[]> {
    return await this.crawlRepository.findProgress();

  }

  async findProgressbyModeName(id: string) {
    return await this.crawlRepository.findProgressbyModeName(id);
  }

  async findProgressCustomer(id: number) {
    return await this.crawlRepository.findProgressCustomer(id);
  }

  async RequestUpdate(id: number, updateCrawlDto: UpdateCrawlDto) {
    const temp_data = await this.crawlRepository.RequestUpdate(id, updateCrawlDto);
    if (temp_data.affected === 0) {
      throw new BadRequestException('Not Found Request Data', { cause: new Error(), description: 'Not Found Request Data' })
    }
    return temp_data
  }

  async RequestRemove(id: number) {
    const temp_data = await this.crawlRepository.RequestRemove(id);
    if (temp_data.affected === 0) {
      throw new BadRequestException('Not Found Seq Number', { cause: new Error(), description: 'Not Found Seq Number' })
    }
    return temp_data
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

  async findProgressErrorCntByCustomerName(id: number) {
    return await this.crawlRepository.findProgressErrorCntByCustomerName(id);
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

  async todayProgressTotal() {
    return await this.crawlRepository.todayProgressTotal();
  }

  async customerRequestTotal(id: string) {
    return await this.crawlRepository.customerRequestTotal(id);
  }

  async findRequestbyCustomerName(id: string) {
    return await this.crawlRepository.findRequestbyCustomerName(id);
  }
  async findRequestbyModeName(id: string) {
    return await this.crawlRepository.findRequestbyModeName(id);
  }
}
