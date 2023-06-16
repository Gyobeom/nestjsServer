import { IsNotEmpty, IsString, Length, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateCrawlDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  customer_seq: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  channel_seq: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  mode: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  start_dt: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  end_dt: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  keyword: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  check_md5: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  period: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type_cd: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  schedules: string
}
