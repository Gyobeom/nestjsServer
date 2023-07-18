import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TbCrawlLogin } from "./TbCrawlLogin";
import { TbCrawlRule } from "./TbCrawlRule";
import { TbCrawlChannelEngine } from "./TbCrawlChannelEngine";
import { TbCrawlChannelInject } from "./TbCrawlChannelInject";

@Index("fk_crawl_channel_rule_seq", ["ruleSeq"], {})
@Index("fk_crawl_channel_login_seq", ["loginSeq"], {})
@Entity("tb_crawl_channel", { schema: "dmap_collector" })
export class TbCrawlChannel {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "채널 seq" })
  seq: number;

  @Column("varchar", { name: "name", comment: "채널명", length: 500 })
  name: string;

  @Column("varchar", {
    name: "memo",
    nullable: true,
    comment: "메모",
    length: 100,
  })
  memo: string | null;

  @Column("varchar", { name: "url", comment: "채널 url", length: 500 })
  url: string;

  @Column("char", {
    name: "chrome_use_yn",
    comment: "크롬 엔진 사용 여부",
    length: 1,
    default: () => "'Y'",
  })
  chromeUseYn: string;

  @Column("int", { name: "rule_seq", comment: "룰 seq" })
  ruleSeq: number;

  @Column("varchar", {
    name: "login_seq",
    nullable: true,
    comment: "로그인 룰 seq",
    length: 20,
  })
  loginSeq: string | null;

  @Column("timestamp", {
    name: "reg_dt",
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @Column("timestamp", { name: "upd_dt", nullable: true, comment: "수정일" })
  updDt: Date | null;

  @ManyToOne(
    () => TbCrawlLogin,
    (tbCrawlLogin) => tbCrawlLogin.tbCrawlChannels,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "login_seq", referencedColumnName: "seq" }])
  loginSeq2: TbCrawlLogin;

  @ManyToOne(() => TbCrawlRule, (tbCrawlRule) => tbCrawlRule.tbCrawlChannels, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "rule_seq", referencedColumnName: "seq" }])
  ruleSeq2: TbCrawlRule;

  @OneToMany(
    () => TbCrawlChannelEngine,
    (tbCrawlChannelEngine) => tbCrawlChannelEngine.channelSeq2
  )
  tbCrawlChannelEngines: TbCrawlChannelEngine[];

  @OneToMany(
    () => TbCrawlChannelInject,
    (tbCrawlChannelInject) => tbCrawlChannelInject.channelSeq2
  )
  tbCrawlChannelInjects: TbCrawlChannelInject[];
}
