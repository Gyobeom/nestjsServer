import { IsNotEmpty, IsString, Length, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class UpdateCrawlDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 상태 / CRS001 - 수집 대기 , CRS002 - 수집 진행 , CRS003 - 수집 완료 , CRS004 - 수집 취소, CRS005 - 수집에러 초기 request 등록시에는 CRS001로 등록' })
  status: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 수행 시작 시간 ex) 00-23 string 형태 number 아님' })
  schedules: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 시작 날짜 ex) \'2023-06 - 25\'' })
  start_dt: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수집 종료 날짜 ex) \'2023-06 - 25\'' })
  end_dt: string

}
