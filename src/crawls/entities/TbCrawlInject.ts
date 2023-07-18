import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TbCrawlChannelInject } from "./TbCrawlChannelInject";

@Entity("tb_crawl_inject", { schema: "dmap_collector" })
export class TbCrawlInject {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "스크립트 seq" })
  seq: number;

  @Column("varchar", { name: "name", comment: "스크립트 파일명", length: 100 })
  name: string;

  @Column("varchar", {
    name: "path",
    comment: "스크립트 파일경로",
    length: 200,
  })
  path: string;

  @Column("varchar", {
    name: "comment",
    nullable: true,
    comment: "설명",
    length: 200,
  })
  comment: string | null;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @Column("timestamp", { name: "upd_dt", nullable: true, comment: "수정일" })
  updDt: Date | null;

  @OneToMany(
    () => TbCrawlChannelInject,
    (tbCrawlChannelInject) => tbCrawlChannelInject.injectscriptSeq2
  )
  tbCrawlChannelInjects: TbCrawlChannelInject[];
}
