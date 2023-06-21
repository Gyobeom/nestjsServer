import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CrawlCustomer } from "./crawlCustomer.entity";

@Index("fk_crawl_request_channel_seq", ["channelSeq"], {})
@Index("fk_crawl_request_status", ["status"], {})
@Index("fk_crawl_request_type_cd", ["typeCd"], {})
@Index("fk_crawl_request_customer_seq", ["customerSeq"], {})
@Entity("tb_crawl_request", { schema: "dmap_collector" })
export class CrawlRequest {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "수집요청 seq" })
  seq: number;

  @Column("int", { name: "customer_seq", comment: "고객 seq" })
  customerSeq: number;

  @Column("int", { name: "channel_seq", comment: "수집채널 seq" })
  channelSeq: number;

  @Column("char", {
    name: "type_cd",
    comment: "수집 방식 타입",
    length: 6,
    default: () => "'CRT001'",
  })
  typeCd: string;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "수집요청 제목",
    length: 200,
  })
  title: string | null;

  @Column("char", {
    name: "period",
    comment: "수집주기(YY,MM,DD,QQ)",
    length: 2,
    default: () => "'DD'",
  })
  period: string;

  @Column("char", {
    name: "start_dt",
    comment: "수집시작일",
    length: 10,
    default: () => "''",
  })
  startDt: string;

  @Column("char", {
    name: "end_dt",
    comment: "수집종료일",
    length: 10,
    default: () => "''",
  })
  endDt: string;

  @Column("varchar", {
    name: "keyword",
    nullable: true,
    comment: "수집 키워드",
    length: 100,
  })
  keyword: string | null;

  @Column("varchar", {
    name: "status",
    comment: "수집상태",
    length: 20,
    default: () => "'CRS001'",
  })
  status: string;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @Column("timestamp", { name: "upd_dt", nullable: true, comment: "수정일" })
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

  @ManyToOne(() => CrawlCustomer, (CrawlCustomer) => CrawlCustomer.requests, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "customer_seq", referencedColumnName: "seq" }
  ])
  crawlCustomer: CrawlCustomer
}
