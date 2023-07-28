import { Injectable, Inject, BadRequestException } from "@nestjs/common";
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
import * as moment from 'moment';
import { getServiceBusQueueCount, getBlobCount, getQueueCount } from '../azure/azure_count'


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

  async findProgress() {
    try {
      return await this.crawlProgress.find();
    } catch (e) {
      console.log('Find Progress ERROR')
      throw e
    }
  }

  async findRequestbyModeName(id: string) {
    try {
      const customerCnt = await this.crawlRepository.createQueryBuilder('request')
        .where('request.mode IN (:id)', { id: id })
        .getMany();
      return customerCnt
    } catch (e) {
      console.log(e);
      throw e
    }
  }

  async findRequestbyCustomerName(id: string) {
    try {
      const customer_seq = await this.crawlCustomer.find({ where: { name: id } });
      const requestCnt = await this.crawlRepository.createQueryBuilder('request')
        .where('request.customer_seq = :id', { id: customer_seq[0].seq })
        .getMany();
      console.log(requestCnt);
      return requestCnt
    } catch (e) {
      console.log(e);
      throw e
    }
  }

  async findProgressbyModeName(id: string) {
    try {
      const progressCnt = await this.crawlProgress.createQueryBuilder('progress')
        .select('progress.request_seq')
        .innerJoin(TbCrawlRequest, 'request', 'progress.request_seq = request.seq')
        .where('request.mode IN (:id)', { id: id })
        .getCount();
      return progressCnt
    } catch (e) {
      console.log(e);
      throw e
    }
  }


  async findProgressErrorCntByCustomerName(id: number) {
    try {
      const customerCnt = await this.crawlCustomer.createQueryBuilder('customer')
        .where("customer.seq = :id", { id: id })
        .getCount();
      if (customerCnt == 0) {
        throw new BadRequestException('Check customer Seq number', { cause: new Error(), description: 'Check Customer Seq number' });
      } else {
        const progressErrorCnt = await this.crawlProgress.createQueryBuilder('progress')
          .select('progress.request_seq')
          .innerJoin(TbCrawlRequest, 'request', 'progress.request_seq = request.seq')
          .where('request.customer_seq IN (:id)', { id: id })
          .andWhere('progress.error_msg is not null')
          .getCount();
        return progressErrorCnt

        //return progressErrorCnt
      }
    } catch (err) {
      console.log(err);
      throw err
    }
  }

  async findProgressErrorCountByModeName(id: string) {
    try {
      const customerCnt = await this.crawlRepository.createQueryBuilder('request')
        .where("request.mode = :id", { id: id })
        .getCount();
      if (customerCnt == 0) {
        throw new BadRequestException('Check Mode Name', { cause: new Error(), description: 'Check Mode Name' });
      } else {
        const progressErrorCnt = await this.crawlProgress.createQueryBuilder('progress')
          .select('progress.request_seq')
          .innerJoin(TbCrawlRequest, 'request', 'progress.request_seq = request.seq')
          .where('request.mode IN (:id)', { id: id })
          .andWhere('progress.error_msg is not null')
          .getCount();
        return progressErrorCnt

        //return progressErrorCnt
      }
    } catch (err) {
      console.log(err);
      throw err
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

  async RequestUpdate(id: number, updateCrawlDto: UpdateCrawlDto) {
    try {
      if (await this.crawlRepository.find({ where: { seq: id } })) {
        return await this.crawlRepository.createQueryBuilder()
          .update()
          .set({
            status: updateCrawlDto.status,
            schedules: updateCrawlDto.schedules,
            startDt: updateCrawlDto.start_dt,
            endDt: updateCrawlDto.end_dt
          })
          .where("seq = :id", { id: id })
          .execute();
      } else {
        return ({ affected: 0 })
      }
    } catch (e) {
      console.log('Not Updated');
      throw (e);
    }
  }

  async RequestRemove(id: number) {
    try {
      if (await this.crawlRepository.find({ where: { seq: id } })) {
        return await this.crawlProgress.createQueryBuilder()
          .delete()
          .where("request_seq = :id", { id: id })
          .execute();
      }
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

  async todayProgressTotal() {
    try {
      const today = moment().format("YYYY-MM-DD");
      const yearMode = await this.crawlRepository.createQueryBuilder('request')
        .select(['request.customerSeq', 'request.mode'])
        .where('end_dt >= :startDate', { startDate: today })
        .andWhere('mode is not null')
        .andWhere('mode != ""')
        .groupBy('mode')
        .getMany();

      console.log(yearMode);
      console.log(moment().format());

      //병렬처리
      const promises = yearMode.map(async i => {
        let progressCnt = await this.findRequestbyModeName(i.mode);
        let progressErrorCnt = await this.findProgressErrorCntByCustomerName(i.customerSeq);
        // let requestQueue = await this.getQueueCount(i.mode);
        // let blobCount = await this.getBlobCount(i.mode);
        // let serviceBuseQueue = await this.getServiceBusQueueCount(i.mode);

        return Promise.allSettled([progressCnt, progressErrorCnt])
          .then(results => {
            const [progressCntResult, progressErrorCntResult] = results;
            const result = {
              modeName: i.mode,
              progressCount: progressCntResult.status === 'fulfilled' ? progressCntResult.value : null,
              progressErrorCount: progressErrorCntResult.status === 'fulfilled' ? progressErrorCntResult.value : null,
              // requestQueue: requestQueueResult.status === 'fulfilled' ? requestQueueResult.value : null,
              // blobCount: blobCountResult.status === 'fulfilled' ? blobCountResult.value : null,
              // serviceBusQueue: serviceBusQueueResult.status === 'fulfilled' ? serviceBusQueueResult.value : null
            };
            console.log(result);
            console.log(moment().format());
            return result;
          });
      });
      const totalProgress = await Promise.all(promises);
      return totalProgress;
      //return yearMode;
    } catch (err) {
      console.log(err);
      throw err
    }

  }

  async customerRequestTotal(id: string) {
    try {
      const yearMode = await this.crawlRepository.createQueryBuilder('request')
        .select('request.mode')
        .innerJoin(TbCustomer, "customer", "customer.seq = request.customer_seq")
        .where('customer.name = :id', { id: id })
        .andWhere('customer.use_yn = :name', { name: "Y" })
        .groupBy('request.mode')
        .getMany();
      console.log(yearMode);

      //병렬처리
      const promises = yearMode.map(async i => {
        let progressCnt = await this.findProgressbyModeName(i.mode);
        let progressErrorCnt = await this.findProgressErrorCountByModeName(i.mode);


        return Promise.allSettled([progressCnt, progressErrorCnt])
          .then(results => {
            const [progressCntResult, progressErrorCntResult] = results;
            const result = {
              modeName: i.mode,
              progressCount: progressCntResult.status === 'fulfilled' ? progressCntResult.value : null,
              progressErrorCount: progressErrorCntResult.status === 'fulfilled' ? progressErrorCntResult.value : null,
            };
            console.log(result);
            console.log(moment().format());
            return result;
          });
      });
      const totalProgress = await Promise.all(promises);
      console.log(totalProgress);
      return totalProgress;
    } catch (err) {
      console.log(err);
      throw err
    }

  }

  async getServiceBusQueueCount(queueName: string) {
    return await getServiceBusQueueCount(queueName)
  }

  async getBlobCount(queueName: string) {
    return await getBlobCount(queueName)
  }

  async getQueueCount(queueName: string) {
    return await getQueueCount(queueName)
  }
}
