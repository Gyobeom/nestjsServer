import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TbCrawlChannel } from "./TbCrawlChannel";

@Entity("tb_crawl_rule", { schema: "dmap_collector" })
export class TbCrawlRule {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "룰 seq" })
  seq: number;

  @Column("varchar", { name: "name", comment: "룰 파일명", length: 200 })
  name: string;

  @Column("varchar", { name: "path", comment: "룰 파일경로", length: 200 })
  path: string;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @Column("timestamp", { name: "upd_dt", nullable: true, comment: "수정일" })
  updDt: Date | null;

  @OneToMany(() => TbCrawlChannel, (tbCrawlChannel) => tbCrawlChannel.ruleSeq2)
  tbCrawlChannels: TbCrawlChannel[];
}
