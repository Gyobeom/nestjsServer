import { Module } from '@nestjs/common';
import { CrawlsModule } from './crawls/crawls.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CrawlsModule],

})
export class AppModule { }