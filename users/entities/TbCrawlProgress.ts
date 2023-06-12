import { Column, Entity } from "typeorm";

@Entity("tb_crawl_progress", { schema: "dmap_collector" })
export class TbCrawlProgress {
  @Column("int", { name: "seq", nullable: true })
  seq: number | null;

  @Column("int", { name: "request_seq", nullable: true })
  requestSeq: number | null;

  @Column("date", { name: "progress_dt" })
  progressDt: string;

  @Column("varchar", { name: "start_dt", nullable: true, length: 10 })
  startDt: string | null;

  @Column("varchar", { name: "end_dt", nullable: true, length: 10 })
  endDt: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 20 })
  status: string | null;

  @Column("varchar", { name: "error_msg", nullable: true, length: 200 })
  errorMsg: string | null;

  @Column("char", { name: "on_going_flag", nullable: true, length: 1 })
  onGoingFlag: string | null;

  @Column("timestamp", { name: "reg_dt" })
  regDt: Date;

  @Column("timestamp", { name: "upd_dt", nullable: true })
  updDt: Date | null;
}
