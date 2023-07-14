import { Module } from '@nestjs/common';
import { CrawlsService } from '../service/crawls.service';
import { CrawlsController } from '../controller/crawls.controller';
import { CrawlsProvider } from '../repository/crawl.dbrepository';
import { CrawlsRepository } from '../repository/crawls.repository';
import { DatabaseModule } from 'src/crawls/database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [CrawlsController],
  providers: [...CrawlsProvider, CrawlsService, CrawlsRepository]
})
export class CrawlsModule { }
