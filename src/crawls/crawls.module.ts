import { Module } from '@nestjs/common';
import { CrawlsService } from './crawls.service';
import { CrawlsController } from './crawls.controller';
import { CrawlsProvider } from './crawl.repository';
import { DatabaseModule } from 'database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [CrawlsController],
  providers: [...CrawlsProvider, CrawlsService]
})
export class CrawlsModule { }
