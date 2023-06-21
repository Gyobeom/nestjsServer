import { IsNotEmpty, IsString, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  comment: string

  @IsString()
  @ApiProperty()
  useYn: string

  @IsDate()
  @ApiProperty()
  regDt: Date

  @IsDate()
  @ApiProperty()
  updDt: Date
}