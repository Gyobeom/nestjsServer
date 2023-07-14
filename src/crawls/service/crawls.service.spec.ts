import { Test, TestingModule } from '@nestjs/testing';
import { CrawlsService } from './crawls.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CrawlRequest } from '../entities/crawlRequest.entity';
import { CrawlsRepository } from '../repository/crawls.repository';
import { CrawlProgress } from '../entities/crawlProgress.entity';
import { CrawlCustomer } from '../entities/crawlCustomer.entity';

class mockRepository {
  champIds = ['1', '2', '3', '4', '5'];
  preferChamp = [
    { preferChamp: '1', user: 'kim' },
    { preferChamp: '1', user: 'lee' },
    { preferChamp: '2', user: 'park' },
  ];
  getChampList() {
    return this.champIds;
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CrawlService', () => {
  let service: CrawlsService;
  let crawlRepository: CrawlsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlsService,
        {
          provide: CrawlsRepository,
          useClass: mockRepository
        }
      ]
    }).compile();
    service = module.get<CrawlsService>(CrawlsService);
    crawlRepository = module.get<CrawlsRepository>(CrawlsRepository);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});