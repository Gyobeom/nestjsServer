import { IsNotEmpty, IsString, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'request 등록 시 사용할 mode_name과 동일하게 생성 ex)ndmi_portal' })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '해당 customer 설명' })
  comment: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '사용여부 표시 Y/N' })
  useYn: string

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: '등록 시간' })
  regDt: Date

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: '수정 된 시간' })
  updDt: Date
}