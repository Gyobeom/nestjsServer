import { Injectable, Inject } from "@nestjs/common";
import { CrawlRequest } from "./entities/crawlRequest.entity";
import { CrawlProgress } from "./entities/crawlProgress.entity";
import { CreateCrawlDto } from "./dto/create-crawl.dto";
import { UpdateCrawlDto } from "./dto/update-crawl.dto";
import { Repository } from 'typeorm';

@Injectable()
export class CrawlsRepository {
  constructor(
    @Inject('CRAWL_REPOSITORY')
    private readonly crawlRepo: Repository<CrawlRequest>,
    @Inject('CRAWL_PROGRESS_REPOSITORY')
    private readonly crawlProg: Repository<CrawlProgress>
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

  async findRequest() {
    return await this.crawlRepo.find();
  }

  async findProgress() {
    return await this.crawlProg.find();
  }

  async findProgressCustomerCount(id: number) {
    const mainQuery =
      await this.crawlProg.createQueryBuilder('progress')
        .innerJoin(CrawlRequest, 'request', 'progress.request_seq = request.seq')
        .where('request.customer_seq IN (:id)', { id: id })
        .getCount();
    console.log(mainQuery);
    return mainQuery
  }

  async findProgressCustomer(id: number) {
    const mainQuery =
      await this.crawlProg.createQueryBuilder('progress')
        .innerJoin(CrawlRequest, 'request', 'progress.request_seq = request.seq')
        .where('request.customer_seq IN (:id)', { id: id })
        .getMany();
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

  async remove(id: string) {
    return await this.crawlProg.createQueryBuilder()
      .delete()
      .where("request_seq = :id", { id: id })
      .execute();
  }
}
