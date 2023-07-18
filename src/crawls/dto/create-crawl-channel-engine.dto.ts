import { IsNotEmpty, IsString, IsDate, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateEngineDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'channel seq 번호' })
  channel_seq: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '링크 수집(link) - CET001 , 문서 수집(doc) - CET002, 링크&문서 수집 구분(linkdoc) - CET003' })
  type_cd: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '파일명 ex) ****_link.js' })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '파일 위치 ex) engine/doc_engine/*****.js ' })
  path: string
}