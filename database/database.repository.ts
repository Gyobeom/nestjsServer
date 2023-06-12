import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Crawl } from 'src/crawls/entities/crawl.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        entities: [User, Crawl],
        synchronize: false,
      });

      return dataSource.initialize()
    }
  },
];