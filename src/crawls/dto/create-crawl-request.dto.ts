import { IsNotEmpty, IsString, Length, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateRequestCrawlDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'customer seq 번호' })
  customer_seq: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'channel seq 번호' })
  channel_seq: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'request 이름' })
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'customer_name과 동일하게 ex) ndmi_portal' })
  mode: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 시작 날짜 ex) \'2023-06 - 25\'' })
  start_dt: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 종료 날짜 ex) \'2023-06 - 25\'' })
  end_dt: string

  @IsString()
  @ApiProperty({ description: '키워드 수집시 수집 키워드 입력 ex) 태풍 / 전수 수집시 빈 값' })
  keyword: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'N' })
  check_md5: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '월 수집 MM / 매일 수집 DD' })
  period: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 분류 / CRT001 - 전수수집, CRT002 - 키워드 수집' })
  type_cd: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 상태 / CRS001 - 수집 대기 , CRS002 - 수집 진행 , CRS003 - 수집 완료 , CRS004 - 수집 취소, CRS005 - 수집에러 초기 request 등록시에는 CRS001로 등록' })
  status: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 수행 시작 시간 ex) 00-23 string 형태 number 아님' })
  schedules: string
}
