import { Test, TestingModule } from '@nestjs/testing';
import { CrawlsController } from './crawls.controller';
import { CrawlsService } from './crawls.service';
import { CreateCrawlDto } from './dto/create-crawl.dto';
describe('CrawlsController', () => {
  let controller: CrawlsController;
  let service: CrawlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlsController],
      providers: [
        {
          provide: CrawlsService,
          useValue: {
            insertRequest: jest.fn().mockImplementation((createCrawlDto: CreateCrawlDto) =>
              Promise.resolve({ sqe: 'a uuid', ...createCrawlDto })
            ),
            findRequest: jest.fn().mockResolvedValue([
              {
                seq: 111, customerSeq: 222, channelSeq: 333, typeCd: "CRT001", title: "test", period: "DD", startDt: "2023-06-16", endDt: "2023-06-16", keyword: "test", status: "CRS001", regDt: "2017-11-21 17:29:48.000", updDt: "2020-04-09 16:05:39.000", schedules: "05", daySchedules: "*", monthSchedules: "*", yearSchedules: "*", checkMd5: "N", mode: "test"
              },
              {
                seq: 123, customerSeq: 333, channelSeq: 444, typeCd: "CRT001", title: "test2", period: "DD", startDt: "2023-06-16", endDt: "2023-06-16", keyword: "test2", status: "CRS001", regDt: "2017-11-21 17:29:48.000", updDt: "2020-04-09 16:05:39.000", schedules: "05", daySchedules: "*", monthSchedules: "*", yearSchedules: "*", checkMd5: "N", mode: "test"
              },
              {
                seq: 456, customerSeq: 444, channelSeq: 555, typeCd: "CRT001", title: "test3", period: "DD", startDt: "2023-06-16", endDt: "2023-06-16", keyword: "test3", status: "CRS001", regDt: "2017-11-21 17:29:48.000", updDt: "2020-04-09 16:05:39.000", schedules: "05", daySchedules: "*", monthSchedules: "*", yearSchedules: "*", checkMd5: "N", mode: "test"
              }
            ]),
            findProgress: jest.fn().mockResolvedValue([
              {
                seq: 777777, request_seq: 111, progressDt: '2023-06-16', startDt: '2023-06-16', endDt: '2023-06-16', status: 'docFinished', errorMsg: null, onGoingFlag: 'N', regDt: "2017-11-21 17:29:48.000", updDt: "2020-04-09 16:05:39.000"
              },
              {
                seq: 888888, request_seq: 222, progressDt: '2023-06-16', startDt: '2023-06-16', endDt: '2023-06-16', status: 'docFinished', errorMsg: null, onGoingFlag: 'N', regDt: "2017-11-21 17:29:48.000", updDt: "2020-04-09 16:05:39.000"
              },
              {
                seq: 999999, request_seq: 333, progressDt: '2023-06-16', startDt: '2023-06-16', endDt: '2023-06-16', status: 'docFinished', errorMsg: null, onGoingFlag: 'N', regDt: "2017-11-21 17:29:48.000", updDt: "2020-04-09 16:05:39.000"
              }

            ]),

          }
        }
      ],
    }).compile();

    controller = module.get(CrawlsController);
    service = module.get(CrawlsService);
  });

  describe('crawls', () => {

  })
});
