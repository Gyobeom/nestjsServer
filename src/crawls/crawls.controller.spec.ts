import { Test, TestingModule } from '@nestjs/testing';
import { CrawlsController } from './crawls.controller';
import { CrawlsService } from './crawls.service';
import { CrawlsRepository } from './crawls.repository';
import { CrawlsProvider } from './crawl.dbrepository';
import { DatabaseModule } from 'database/database.module';

describe('CrawlsController', () => {
  let controller: CrawlsController;
  let service: CrawlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CrawlsController],
      providers: [CrawlsService, CrawlsRepository, ...CrawlsProvider],
    }).compile();

    controller = module.get(CrawlsController);
    service = module.get(CrawlsService);
  });

  describe('crawls', () => {

  })
});
