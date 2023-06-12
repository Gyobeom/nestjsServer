import { PartialType } from '@nestjs/mapped-types';
import { CreateCrawlDto } from './create-crawl.dto';

export class UpdateCrawlDto extends PartialType(CreateCrawlDto) {}
