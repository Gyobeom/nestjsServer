import { Injectable } from '@nestjs/common';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';
import { CrawlProgress } from './entities/crawlProgress.entity';
import { CrawlRequest } from './entities/crawlRequest.entity';
import { CrawlsRepository } from './crawls.repository';

@Injectable()
export class CrawlsService {
  constructor(
    private readonly crawlRepository: CrawlsRepository
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
    return await this.crawlRepository.update(id, updateCrawlDto);
  }

  async remove(id: string) {
    return await this.crawlRepository.remove(id);
  }
}
