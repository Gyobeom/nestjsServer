import { PickType } from '@nestjs/mapped-types';
import { CreateRequestCrawlDto } from './create-crawl-request.dto';

export class UpdateCrawlDto extends PickType(CreateRequestCrawlDto, ['status', 'schedules', 'start_dt', 'end_dt'] as const) { }
