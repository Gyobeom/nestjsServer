import { DataSource } from 'typeorm';
import { CrawlProgress } from 'src/crawls/entities/crawlProgress.entity';
import { CrawlRequest } from 'src/crawls/entities/crawlRequest.entity';
import { CrawlCustomer } from 'src/crawls/entities/crawlCustomer.entity';


export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        entities: [CrawlRequest, CrawlProgress, CrawlCustomer],
        synchronize: false,
      });

      return dataSource.initialize()
    }
  },
];