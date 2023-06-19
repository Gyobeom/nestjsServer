import { Test, TestingModule } from '@nestjs/testing';
import { CrawlsController } from './crawls.controller';
import { CrawlsService } from './crawls.service';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';
import exp from 'constants';

describe('CrawlsController', () => {
  let controller: CrawlsController;
  let service: CrawlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlsController],
      providers: [],
    }).compile();

    controller = module.get<CrawlsController>(CrawlsController);
    service = module.get<CrawlsService>(CrawlsService);
  });

});
