import { Injectable, Inject } from '@nestjs/common';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';
import { CrawlProgress } from './entities/crawlProgress.entity';
import { CrawlRequest } from './entities/crawlRequest.entity';
import { Repository, IsNull, Not } from 'typeorm';

@Injectable()
export class CrawlsService {
  constructor(
    @Inject('CRAWL_REPOSITORY')
    private crawlRepo: Repository<CrawlRequest>,
    @Inject('CRAWL_PROGRESS_REPOSITORY')
    private crawlProg: Repository<CrawlProgress>
  ) { }

  async insertRequest(createCrawlDto: CreateCrawlDto) {
    return await this.crawlRepo.createQueryBuilder()
      .insert()
      .into(CrawlRequest)
      .values([
        {
          customerSeq: createCrawlDto.customer_seq,
          channelSeq: createCrawlDto.channel_seq,
          title: createCrawlDto.title,
          mode: createCrawlDto.mode,
          startDt: createCrawlDto.start_dt,
          endDt: createCrawlDto.end_dt,
          keyword: createCrawlDto.keyword,
          checkMd5: createCrawlDto.check_md5,
          period: createCrawlDto.period,
          typeCd: createCrawlDto.type_cd,
          status: createCrawlDto.status,
          daySchedules: '*',
          monthSchedules: '*',
          yearSchedules: '*'
        }
      ])
      .execute();
  }

  async findAll(): Promise<CrawlRequest[]> {
    return await this.crawlRepo.find();
  }

  async findOne(id: number) {
    return await this.crawlRepo.createQueryBuilder('crawl')
      .where("crawl.customer_seq = :id", { id: id })
      .getOne()
    // return await this.crawlRepo.findOneBy({ customerSeq: id });
  }

  async findProgress(): Promise<CrawlProgress[]> {
    return await this.crawlProg.find();

  }
  async findProgressCount() {
    return await this.crawlProg.count(
      {
        where: {
          errorMsg: Not(IsNull())
        }
      }
    )
  }

  async findProgressCustomer(id: number) {
    const mainQuery =
      await this.crawlProg.createQueryBuilder('progress')
        .innerJoin(CrawlRequest, 'request', 'progress.request_seq = request.seq')
        .where('request.customer_seq IN (:id)', { id: id })
        .getCount();
    console.log(mainQuery);
    return mainQuery
  }

  async update(id: string, updateCrawlDto: UpdateCrawlDto) {
    return await this.crawlRepo.createQueryBuilder()
      .update()
      .set({
        status: updateCrawlDto.status,
        schedules: updateCrawlDto.schedules,
        startDt: updateCrawlDto.start_dt,
        endDt: updateCrawlDto.end_dt
      })
      .where("channel_seq = :id", { id: id })
      .execute();
  }

  remove(id: number) {
    return `This action removes a #${id} crawl`;
  }
}
