import { Column, Entity } from "typeorm";

@Entity("tb_crawl_request", { schema: "dmap_collector" })
export class TbCrawlRequest {
  @Column("int", { primary: true, name: "seq" })
  seq: number;

  @Column("int", { name: "customer_seq", nullable: true })
  customerSeq: number | null;

  @Column("int", { name: "channel_seq", nullable: true })
  channelSeq: number | null;

  @Column("char", { name: "type_cd", nullable: true, length: 6 })
  typeCd: string | null;

  @Column("varchar", { name: "title", nullable: true, length: 200 })
  title: string | null;

  @Column("char", { name: "period", nullable: true, length: 2 })
  period: string | null;

  @Column("char", { name: "start_dt", nullable: true, length: 10 })
  startDt: string | null;

  @Column("char", { name: "end_dt", nullable: true, length: 10 })
  endDt: string | null;

  @Column("varchar", { name: "keyword", nullable: true, length: 100 })
  keyword: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 20 })
  status: string | null;

  @Column("timestamp", { name: "reg_dt" })
  regDt: Date;

  @Column("timestamp", { name: "upd_dt", nullable: true })
  updDt: Date | null;

  @Column("mediumtext", { name: "schedules", nullable: true })
  schedules: string | null;

  @Column("varchar", { name: "day_schedules", nullable: true, length: 100 })
  daySchedules: string | null;

  @Column("varchar", { name: "month_schedules", nullable: true, length: 100 })
  monthSchedules: string | null;

  @Column("varchar", { name: "year_schedules", nullable: true, length: 100 })
  yearSchedules: string | null;

  @Column("varchar", { name: "check_md5", nullable: true, length: 10 })
  checkMd5: string | null;

  @Column("varchar", { name: "mode", nullable: true, length: 20 })
  mode: string | null;
}
