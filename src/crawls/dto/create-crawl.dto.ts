import { IsNotEmpty, IsString, Length, IsNumber } from "class-validator";

export class CreateCrawlDto {
  @IsNotEmpty()
  @IsNumber()
  customer_seq: number

  @IsNotEmpty()
  @IsNumber()
  channel_seq: number

  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  mode: string

  @IsNotEmpty()
  @IsString()
  start_dt: string

  @IsNotEmpty()
  @IsString()
  end_dt: string

  @IsNotEmpty()
  @IsString()
  keyword: string

  @IsNotEmpty()
  @IsString()
  check_md5: string

  @IsNotEmpty()
  @IsString()
  period: string

  @IsNotEmpty()
  @IsString()
  type_cd: string

  @IsNotEmpty()
  @IsString()
  status: string

  @IsNotEmpty()
  @IsString()
  schedules: string
}
