import { Column, Entity, OneToMany } from "typeorm";
import { TbCrawlChannel } from "./TbCrawlChannel";

@Entity("tb_crawl_login", { schema: "dmap_collector" })
export class TbCrawlLogin {
  @Column("varchar", {
    primary: true,
    name: "seq",
    comment: "로그인 seq",
    length: 20,
    default: () => "''",
  })
  seq: string;

  @Column("varchar", { name: "id", comment: "아이디", length: 100 })
  id: string;

  @Column("varchar", { name: "password", comment: "패스워드", length: 200 })
  password: string;

  @Column("varchar", {
    name: "comment",
    nullable: true,
    comment: "메모",
    length: 200,
  })
  comment: string | null;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @OneToMany(() => TbCrawlChannel, (tbCrawlChannel) => tbCrawlChannel.loginSeq2)
  tbCrawlChannels: TbCrawlChannel[];
}
