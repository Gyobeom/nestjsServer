import { Test, TestingModule } from '@nestjs/testing';
import { CrawlsController } from './crawls.controller';
import { CrawlsService } from '../service/crawls.service';
import { CreateCrawlDto } from '../dto/create-crawl-request.dto';
import { UpdateCrawlDto } from '../dto/update-crawl-request.dto';
import exp from 'constants';

describe('CrawlsController', () => {
  let controller: CrawlsController;
  let service: CrawlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlsController],
    }).compile();

    controller = module.get<CrawlsController>(CrawlsController);
    service = module.get<CrawlsService>(CrawlsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
