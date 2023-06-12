import { Test, TestingModule } from '@nestjs/testing';
import { CrawlsController } from './crawls.controller';
import { CrawlsService } from './crawls.service';

describe('CrawlsController', () => {
  let controller: CrawlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlsController],
      providers: [CrawlsService],
    }).compile();

    controller = module.get<CrawlsController>(CrawlsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
