import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  phone?: string;
  @Column()
  createdAt: Date;
  @Column({ nullable: true, default: null })
  updateAT?: Date;
}
