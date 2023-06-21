import { Test } from '@nestjs/testing';
import { TestBed } from '@automock/jest'
import { CrawlRequest } from './entities/crawlRequest.entity';
import { resolve } from 'path';
import { rejects } from 'assert';

class CrawlRepository {

  getRequest(): Promise<CrawlRequest[]> {
    return (
      new Promise((resolve, rejects) => resolve([{
        "seq": 6,
        "customerSeq": 15,
        "channelSeq": 1970,
        "typeCd": "CRT001",
        "title": "[예금보험공사] 수집 안함",
        "period": "DD",
        "startDt": "2017-11-24",
        "endDt": "2020-12-31",
        "keyword": null,
        "status": "CRS004",
        "regDt": new Date(),
        "updDt": new Date(),
        "schedules": "12",
        "daySchedules": "*",
        "monthSchedules": "*",
        "yearSchedules": "*",
        "checkMd5": "N",
        "mode": "",
      },]))
    )
  }
}

class CrawlService {
  constructor(private crawlRepository: CrawlRepository) { }
  async getAllRequest(): Promise<Promise<CrawlRequest>[]> {
    return this.crawlRepository.getRequest();
  }
}

describe('CrawlsService', () => {
  let crawlsService: CrawlService;
  let crawlsRepository: jest.Mocked<CrawlRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CrawlService).compile();
    crawlsService = unit;
    crawlsRepository = unitRef.get(CrawlRepository);
  });

  test('getAllRequest', async () => {
    const mockRequest: CrawlRequest[] = [{}]
  })

  // 나머지 메서드에 대한 테스트도 유사한 방식으로 작성할 수 있습니다.

});