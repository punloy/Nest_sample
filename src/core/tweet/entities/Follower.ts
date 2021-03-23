import { Column, Entity, Index, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Index("follower_pkey", ["id"], { unique: true })
@Entity("Follower", { schema: "public" })
export class Follower {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("integer", { name: "follower_user_id", nullable: true })
    followerUserId: number | null;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;
}
