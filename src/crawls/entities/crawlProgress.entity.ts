import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CrawlRequest } from "./crawlRequest.entity";
@Index(
  "tb_crawl_progress_unique",
  ["progressDt", "requestSeq", "startDt", "endDt"],
  { unique: true }
)
@Index("tb_crawl_progress_idx1", ["requestSeq", "startDt", "endDt"], {})
@Index("tb_crawl_progress_idx2", ["requestSeq", "progressDt", "status"], {})
@Index(
  "tb_crawl_progress_idx3",
  ["requestSeq", "progressDt", "onGoingFlag"],
  {}
)
@Entity("tb_crawl_progress", { schema: "dmap_collector" })
export class CrawlProgress {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "수집현황 seq" })
  seq: number;

  @Column("int", { name: "request_seq", comment: "수집요청 seq" })
  requestSeq: number;

  @Column("date", {
    primary: true,
    name: "progress_dt",
    comment: "수집진행일자(파티션키)",
  })
  progressDt: string;

  @Column("varchar", { name: "start_dt", comment: "수집시작일자", length: 10 })
  startDt: string;

  @Column("varchar", {
    name: "end_dt",
    nullable: true,
    comment: "수집종료일자",
    length: 10,
  })
  endDt: string | null;

  @Column("varchar", { name: "status", comment: "수집상태", length: 20 })
  status: string;

  @Column("varchar", {
    name: "error_msg",
    nullable: true,
    comment: "수집에러메세지",
    length: 200,
  })
  errorMsg: string | null;

  @Column("char", {
    name: "on_going_flag",
    comment: "수집 온고잉 플래그",
    length: 1,
    default: () => "'Y'",
  })
  onGoingFlag: string;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @Column("timestamp", { name: "upd_dt", nullable: true, comment: "수정일" })
  updDt: Date | null;

}
