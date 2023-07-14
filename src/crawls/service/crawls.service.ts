import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCrawlDto } from '../dto/create-crawl.dto';
import { UpdateCrawlDto } from '../dto/update-crawl.dto';
import { CrawlProgress } from '../entities/crawlProgress.entity';
import { CrawlRequest } from '../entities/crawlRequest.entity';
import { CrawlsRepository } from '../repository/crawls.repository';
import { CreateCustomerDto } from '../dto/create-crawl-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CrawlCustomer } from '../entities/crawlCustomer.entity';
import { getServiceBusQueueCount, getBlobCount, getQueueCount } from '../azure/azure_count'

@Injectable()
export class CrawlsService {
  constructor(
    private crawlRepository: CrawlsRepository
  ) { }

  async insertRequest(createCrawlDto: CreateCrawlDto) {
    return await this.crawlRepository.insertRequest(createCrawlDto);
  }

  async findRequest(): Promise<CrawlRequest[]> {
    return await this.crawlRepository.findRequest();
  }

  async findProgress(): Promise<CrawlProgress[]> {
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
    return await getServiceBusQueueCount(queueName)
  }

  async getBlobCount(queueName: string) {
    return await getBlobCount(`${queueName}/`)
  }

  async getQueueCount(queueName: string) {
    return await getQueueCount(`${queueName}/`)
  }

  async findProgressErrorCustomer(id: number) {
    return await this.crawlRepository.findProgressErrorCount(id);
  }


}
