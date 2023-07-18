import { Injectable, Inject } from "@nestjs/common";
import { TbCrawlProgress } from '../entities/TbCrawlProgress'
import { TbCrawlRequest } from '../entities/TbCrawlRequest';
import { CreateRequestCrawlDto } from "../dto/create-crawl-request.dto";
import { UpdateCrawlDto } from "../dto/update-crawl-request.dto";
import { TbCustomer } from '../entities/TbCustomer';
import { CreateCustomerDto } from "../dto/create-crawl-customer.dto";
import { CreateChannelDto } from "../dto/create-crawl-channel.dto";
import { CreateCrawlRuleDto } from "../dto/create-crawl-rule.dto";
import { CreateEngineDto } from "../dto/create-crawl-channel-engine.dto";
import { Repository } from 'typeorm';
import { TbCrawlRule } from '../entities/TbCrawlRule';
import { TbCrawlChannel } from "../entities/TbCrawlChannel";
import { TbCrawlChannelEngine } from "../entities/TbCrawlChannelEngine";

@Injectable()
export class CrawlsRepository {
  constructor(
    @Inject('CRAWL_REPOSITORY')
    private crawlRepository: Repository<TbCrawlRequest>,

    @Inject('CRAWL_PROGRESS_REPOSITORY')
    private crawlProgress: Repository<TbCrawlProgress>,

    @Inject('CRAWL_CUSTOMER_REPOSITORY')
    private crawlCustomer: Repository<TbCustomer>,

    @Inject('CRAWL_CHANNEL_REPOSITORY')
    private crawlChannel: Repository<TbCrawlChannel>,

    @Inject('CRAWL_RULE_REPOSITORY')
    private crawlRule: Repository<TbCrawlRule>,

    @Inject('CRAWL_ENGINE_REPOSITORY')
    private crawlEngine: Repository<TbCrawlChannelEngine>,

  ) { }

  async insertRequest(createCrawlDto: CreateRequestCrawlDto) {
    try {
      return await this.crawlRepository.createQueryBuilder()
        .insert()
        .into(TbCrawlRequest)
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
      return await this.crawlRepository.find()

    } catch (e) {
      console.log('Find Request ERROR')
      throw e
    }
  }

  async findProgress() {
    try {
      return await this.crawlProgress.find();
    } catch (e) {
      console.log('Find Progress ERROR')
      throw e
    }
  }

  async findProgressCustomerCount(id: number) {
    try {
      return await this.crawlProgress.createQueryBuilder('progress')
        .innerJoin(TbCrawlRequest, 'request', 'progress.request_seq = request.seq')
        .where('request.customer_seq IN (:id)', { id: id })
        .getCount();
    } catch (e) {
      console.log()
      throw e
    }
  }

  async findProgressErrorCount(id: number) {
    try {
      return await this.crawlProgress.createQueryBuilder('progress')
        .innerJoin(TbCrawlRequest, 'request', 'progress.request_seq = request.seq')
        .where('request.customer_seq IN (:id)', { id: id })
        .andWhere('progress.error_msg is not null')
        .getCount();
    } catch (e) {
      console.log()
      throw e
    }
  }

  async findProgressCustomer(id: number) {
    try {
      const mainQuery =
        await this.crawlProgress.createQueryBuilder('progress')
          .innerJoin(TbCrawlRequest, 'request', 'progress.request_seq = request.seq')
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
      return await this.crawlRepository.createQueryBuilder()
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
      return await this.crawlProgress.createQueryBuilder()
        .delete()
        .where("request_seq = :id", { id: id })
        .execute();
    } catch (e) {
      console.log("Not Deleted");
      throw (e);
    }
  }

  async insertCustomer(createCustomer: CreateCustomerDto) {
    try {
      return await this.crawlCustomer.createQueryBuilder()
        .insert()
        .into(TbCustomer)
        .values([
          {
            name: createCustomer.name,
            comment: createCustomer.comment,
          }
        ])
        .execute();
    } catch (e) {
      console.log('Insert ERROR');
      throw e;
    }
  }

  async findCustomerTotal() {
    try {
      return await this.crawlCustomer.find()
    } catch (e) {
      console.log('Insert ERROR');
      throw e;
    }
  }

  async findTotalRule() {
    try {
      return await this.crawlRule.find()
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async insertRule(createRule: CreateCrawlRuleDto) {
    try {
      return await this.crawlRule.createQueryBuilder()
        .insert()
        .into(TbCrawlRule)
        .values([
          {
            name: createRule.name,
            path: createRule.path
          }
        ])
        .execute();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async insertEngine(createEngine: CreateEngineDto) {
    try {
      return await this.crawlEngine.createQueryBuilder()
        .insert()
        .into(TbCrawlChannelEngine)
        .values([
          {
            channelSeq: createEngine.channel_seq,
            typeCd: createEngine.type_cd,
            name: createEngine.name,
            path: createEngine.path
          }
        ])
        .execute();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }


}
