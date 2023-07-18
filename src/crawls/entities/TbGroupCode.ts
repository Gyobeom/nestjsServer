import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TbCommonCode } from "./TbCommonCode";

@Index("idx_grp_cd", ["grpCd"], { unique: true })
@Entity("tb_group_code", { schema: "dmap_collector" })
export class TbGroupCode {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "그룹코드 seq" })
  seq: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "그룹코드 설정",
    length: 40,
  })
  name: string | null;

  @Column("char", {
    name: "grp_cd",
    unique: true,
    comment: "그룹코드",
    length: 3,
  })
  grpCd: string;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @OneToMany(() => TbCommonCode, (tbCommonCode) => tbCommonCode.grpCd2)
  tbCommonCodes: TbCommonCode[];
}
