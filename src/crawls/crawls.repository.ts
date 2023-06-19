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
    try {
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
    } catch (e) {
      console.log('Insert ERROR');
      throw e;
    }
  }

  async findRequest() {
    try {
      return await this.crawlRepo.find();
    } catch (e) {
      console.log('Find Request ERROR')
      throw e
    }
  }

  async findProgress() {
    try {
      return await this.crawlProg.find();
    } catch (e) {
      console.log('Find Progress ERROR')
      throw e
    }
  }

  async findProgressCustomerCount(id: number) {
    try {
      return await this.crawlProg.createQueryBuilder('progress')
        .innerJoin(CrawlRequest, 'request', 'progress.request_seq = request.seq')
        .where('request.customer_seq IN (:id)', { id: id })
        .getCount();
    } catch (e) {
      console.log()
      throw e
    }
  }

  async findProgressCustomer(id: number) {
    try {
      const mainQuery =
        await this.crawlProg.createQueryBuilder('progress')
          .innerJoin(CrawlRequest, 'request', 'progress.request_seq = request.seq')
          .where('request.customer_seq IN (:id)', { id: id })
          .getMany();
      return mainQuery
    } catch (e) {
      console.log('ProgressCustomer Not Found');
      throw (e)
    }
  }

  async update(id: string, updateCrawlDto: UpdateCrawlDto) {
    try {
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
    } catch (e) {
      console.log('Not Updated');
      throw (e);
    }
  }

  async remove(id: string) {
    try {
      return await this.crawlProg.createQueryBuilder()
        .delete()
        .where("request_seq = :id", { id: id })
        .execute();
    } catch (e) {
      console.log("Not Deleted");
      throw (e);
    }

  }
}
