import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TbCrawlChannel } from "./TbCrawlChannel";
import { TbCrawlInject } from "./TbCrawlInject";

@Index("fk_crawl_inject_channel_seq", ["channelSeq"], {})
@Index("fk_crawl_inject_inject_seq", ["injectscriptSeq"], {})
@Entity("tb_crawl_channel_inject", { schema: "dmap_collector" })
export class TbCrawlChannelInject {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "seq",
    comment: "채널-인젝트 매핑 seq",
  })
  seq: number;

  @Column("int", { name: "channel_seq", comment: "채널 seq" })
  channelSeq: number;

  @Column("int", { name: "injectscript_seq", comment: "인젝트 seq" })
  injectscriptSeq: number;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @ManyToOne(
    () => TbCrawlChannel,
    (tbCrawlChannel) => tbCrawlChannel.tbCrawlChannelInjects,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "channel_seq", referencedColumnName: "seq" }])
  channelSeq2: TbCrawlChannel;

  @ManyToOne(
    () => TbCrawlInject,
    (tbCrawlInject) => tbCrawlInject.tbCrawlChannelInjects,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "injectscript_seq", referencedColumnName: "seq" }])
  injectscriptSeq2: TbCrawlInject;
}
