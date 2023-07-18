import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TbCrawlChannel } from "./TbCrawlChannel";
import { TbCommonCode } from "./TbCommonCode";

@Index("fk_crawl_channel_engine_channel_seq", ["channelSeq"], {})
@Index("fk_crawl_channel_engine_type_cd", ["typeCd"], {})
@Entity("tb_crawl_channel_engine", { schema: "dmap_collector" })
export class TbCrawlChannelEngine {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "엔진 seq" })
  seq: number;

  @Column("int", { name: "channel_seq", comment: "채널 seq" })
  channelSeq: number;

  @Column("char", {
    name: "type_cd",
    comment: "엔진타입",
    length: 6,
    default: () => "'CET001'",
  })
  typeCd: string;

  @Column("varchar", { name: "name", comment: "엔진명", length: 100 })
  name: string;

  @Column("varchar", { name: "path", comment: "엔진경로", length: 200 })
  path: string;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @Column("timestamp", { name: "upd_dt", nullable: true, comment: "수정일" })
  updDt: Date | null;

  @ManyToOne(
    () => TbCrawlChannel,
    (tbCrawlChannel) => tbCrawlChannel.tbCrawlChannelEngines,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "channel_seq", referencedColumnName: "seq" }])
  channelSeq2: TbCrawlChannel;

  @ManyToOne(
    () => TbCommonCode,
    (tbCommonCode) => tbCommonCode.tbCrawlChannelEngines,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "type_cd", referencedColumnName: "typeCd" }])
  typeCd2: TbCommonCode;
}
