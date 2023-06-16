import { CrawlProgress } from './entities/crawlProgress.entity'
import { CrawlRequest } from './entities/crawlRequest.entity'
import { DataSource } from 'typeorm'

export const CrawlsProvider = [
  {
    provide: 'CRAWL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CrawlRequest),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CRAWL_PROGRESS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CrawlProgress),
    inject: ['DATA_SOURCE'],
  }
]