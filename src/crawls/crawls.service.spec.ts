import { Test, TestingModule } from '@nestjs/testing';
import { CrawlsService } from './crawls.service';

describe('CrawlsService', () => {
  let service: CrawlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlsService],
    }).compile();

    service = module.get<CrawlsService>(CrawlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
