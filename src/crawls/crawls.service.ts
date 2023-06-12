import { Injectable, Inject } from '@nestjs/common';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';
import { Crawl } from './entities/crawl.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrawlsService {
  constructor(
    @Inject('CRAWL_REPOSITORY')
    private crawlRepository: Repository<Crawl>,
  ) { }

  create(createCrawlDto: CreateCrawlDto) {
    return 'This action adds a new crawl';
  }

  async findAll(): Promise<Crawl[]> {
    return await this.crawlRepository.find();
  }

  async findOne(id: number) {
    return await this.crawlRepository.createQueryBuilder('crawl')
      .where("crawl.customer_seq = :id", { id: id })
      .getOne()
    // return await this.crawlRepository.findOneBy({ customerSeq: id });
  }

  update(id: number, updateCrawlDto: UpdateCrawlDto) {
    return `This action updates a #${id} crawl`;
  }

  remove(id: number) {
    return `This action removes a #${id} crawl`;
  }
}
