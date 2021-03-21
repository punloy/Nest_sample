import { Column, Entity, Index, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Index("tweet_pkey", ["id"], { unique: true })
@Entity("Tweet", { schema: "public" })
export class Tweet {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "tweet_tittle", nullable: true })
    tittle: string;

    @Column("character varying", { name: "tweet_content", nullable: true })
    content: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;
}
