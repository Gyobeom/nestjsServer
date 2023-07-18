import { DataSource } from 'typeorm';
import { TbCrawlProgress } from '../entities/TbCrawlProgress'
import { TbCrawlRequest } from '../entities/TbCrawlRequest'
import { TbCustomer } from '../entities/TbCustomer'
import { TbCrawlChannel } from '../entities/TbCrawlChannel'
import { TbCrawlRule } from '../entities/TbCrawlRule'
import { TbCrawlLogin } from '../entities/TbCrawlLogin';
import { TbCrawlInject } from '../entities/TbCrawlInject';
import { TbGroupCode } from '../entities/TbGroupCode';
import { TbCrawlChannelEngine } from '../entities/TbCrawlChannelEngine';
import { TbCrawlChannelInject } from '../entities/TbCrawlChannelInject';
import { TbCommonCode } from '../entities/TbCommonCode';

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
        entities: [TbCrawlRequest, TbCrawlProgress, TbCustomer, TbCrawlRule, TbCrawlChannel, TbCrawlLogin, TbCrawlInject, TbGroupCode, TbCrawlChannelEngine, TbCrawlChannelInject, TbCommonCode],
        synchronize: false,
      });

      return dataSource.initialize()
    }
  },
];