import { Module } from "@nestjs/common";
import { databaseProviders } from './database.repository'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    })
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }