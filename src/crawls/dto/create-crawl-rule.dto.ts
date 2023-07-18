import { IsNotEmpty, IsString, Length, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateCrawlRuleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '룰 파일명 ex) *****.json' })
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'rule/*****.json' })
  path: string
}