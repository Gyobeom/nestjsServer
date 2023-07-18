import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TbGroupCode } from "./TbGroupCode";
import { TbCrawlChannelEngine } from "./TbCrawlChannelEngine";

@Index("idx_common_type_cd", ["typeCd"], { unique: true })
@Index("fk_common_grp_cd", ["grpCd"], {})
@Entity("tb_common_code", { schema: "dmap_collector" })
export class TbCommonCode {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "공통코드 seq" })
  seq: number;

  @Column("char", { name: "grp_cd", comment: "그룹코드", length: 3 })
  grpCd: string;

  @Column("char", {
    name: "type_cd",
    unique: true,
    comment: "공통코드",
    length: 6,
  })
  typeCd: string;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "공통코드명",
    length: 100,
  })
  name: string | null;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @ManyToOne(() => TbGroupCode, (tbGroupCode) => tbGroupCode.tbCommonCodes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "grp_cd", referencedColumnName: "grpCd" }])
  grpCd2: TbGroupCode;

  @OneToMany(
    () => TbCrawlChannelEngine,
    (tbCrawlChannelEngine) => tbCrawlChannelEngine.typeCd2
  )
  tbCrawlChannelEngines: TbCrawlChannelEngine[];
}
