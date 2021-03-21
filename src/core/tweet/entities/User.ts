import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Follower } from "./Follower";
import { Tweet } from "./Tweet";


@Index("user_pkey", ["id"], { unique: true })
@Entity("User", { schema: "public" })
export class User {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "user_name", nullable: false })
    name: string;

    @OneToMany(() => Tweet, (tweets) => tweets.id)
    tweets: Tweet[];

    @OneToMany(() => Follower, (followers) => followers.id)
    followers: Follower[];
}
