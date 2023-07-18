import { TbCrawlProgress } from '../entities/TbCrawlProgress'
import { TbCrawlRequest } from '../entities/TbCrawlRequest'
import { TbCustomer } from '../entities/TbCustomer'
import { TbCrawlChannel } from '../entities/TbCrawlChannel'
import { TbCrawlRule } from '../entities/TbCrawlRule'
import { DataSource } from 'typeorm'
import { TbCrawlChannelEngine } from '../entities/TbCrawlChannelEngine'

export const CrawlsProvider = [
  {
    provide: 'CRAWL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TbCrawlRequest),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CRAWL_PROGRESS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TbCrawlProgress),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CRAWL_CUSTOMER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TbCustomer),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CRAWL_CHANNEL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TbCrawlChannel),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CRAWL_RULE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TbCrawlRule),
    inject: ['DATA_SOURCE'],
  }
  ,
  {
    provide: 'CRAWL_ENGINE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TbCrawlChannelEngine),
    inject: ['DATA_SOURCE'],
  }
]