import { Test, TestingModule } from '@nestjs/testing';
import { CrawlsService } from './crawls.service';
import { CrawlsRepository } from './crawls.repository';
import { UpdateCrawlDto } from './dto/update-crawl.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CrawlRequest } from './entities/crawlRequest.entity';

class MockRepository {
  async findOneorFail(query) {
    const crawl: CrawlRequest = new CrawlRequest();
    crawl.title = query.title;
    return crawl
  }
}


describe('CrawlsService', () => {
  let crawlService: CrawlsService;
  let crawlRepository: MockRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrawlsService,
        {
          provide: getRepositoryToken(CrawlRequest),
          useClass: MockRepository,
        },
      ],
    }).compile();

    crawlService = module.get<CrawlsService>(CrawlsService);
  });

  it('should', async () => {
    const userId = '42';
    const result = await crawlRepository.findOneorFail({ title: '42' });
  })


});
