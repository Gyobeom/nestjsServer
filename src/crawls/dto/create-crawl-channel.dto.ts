import { IsNotEmpty, IsString, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateChannelDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 프로젝트 제목' })
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 사이트 주소' })
  url: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '크롬 엔진 사용 여부 Y/N' })
  chrome_use_yn: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Rule SEQ 넘버' })
  ruleSeq: number
}