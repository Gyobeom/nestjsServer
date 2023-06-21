import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CrawlRequest } from "./crawlRequest.entity";
import { type } from "os";

@Entity("tb_customer", { schema: "dmap_collector" })
export class CrawlCustomer {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "고객 seq" })
  seq: number;

  @Column("varchar", { name: "name", comment: "고객명", length: 50 })
  name: string;

  @Column("varchar", {
    name: "comment",
    nullable: true,
    comment: "설명",
    length: 200,
  })
  comment: string | null;

  @Column("char", {
    name: "use_yn",
    nullable: true,
    comment: "사용여부",
    length: 1,
    default: () => "'Y'",
  })
  useYn: string | null;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @Column("timestamp", { name: "upd_dt", nullable: true, comment: "수정일" })
  updDt: Date | null;

  @OneToMany(
    () => CrawlRequest, (CrawlRequest) => CrawlRequest.crawlCustomer
  )
  requests: CrawlRequest[]
}
