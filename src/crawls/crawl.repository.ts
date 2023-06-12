import { Crawl } from './entities/crawl.entity'
import { DataSource } from 'typeorm'

export const CrawlsProvider = [
  {
    provide: 'CRAWL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Crawl),
    inject: ['DATA_SOURCE'],
  },
]