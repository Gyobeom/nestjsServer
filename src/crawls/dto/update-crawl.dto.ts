import { PickType } from '@nestjs/mapped-types';
import { CreateCrawlDto } from './create-crawl.dto';

export class UpdateCrawlDto extends PickType(CreateCrawlDto, ['status', 'schedules', 'start_dt', 'end_dt'] as const) { }
