import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CrawlsModule } from './crawls/crawls.module';

@Module({
  imports: [UsersModule, CrawlsModule],
})
export class AppModule { }