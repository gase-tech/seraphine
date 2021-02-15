import { AutoMap } from "@automapper/classes";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { Question } from "../../sessions/models/entity/question.entity";
import { Session } from "../../sessions/models/entity/session.entity";

@Entity()
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ unique: true })
  username: string;

  @AutoMap()
  @Column({ default: null })
  email: string;

  @AutoMap()
  @Column()
  firstName: string;

  @AutoMap()
  @Column()
  lastName: string;

  @Column()
  @AutoMap()
  password: string;

  @AutoMap()
  @Column()
  role: string;

  @AutoMap()
  @Column({ default: true })
  isActive: boolean;

  @VersionColumn()
  version: number;

  @OneToMany(() => Session, (session) => session.createdBy)
  sessions: Session[];

  questions: Question[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @BeforeInsert()
  emailToLowerCase() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }
}
