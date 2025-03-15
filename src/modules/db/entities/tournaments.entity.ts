import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { DeckEntity } from "./decks.entity";
import { UsersEntity } from "./user.entity";

@Entity({ name: "tournaments" })
export class TournamentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name!: string;

    @Column({ type: "timestamp", nullable: false })
    start_date!: Date;

    @Column({ type: "timestamp", nullable: false })
    end_date!: Date;

    @Column({ type: "varchar", length: 50, nullable: false })
    format!: string;

    @Column({ type: "boolean", nullable: false })
    online: boolean;

    @OneToMany(() => DeckEntity, (deck) => deck.tournament_id)
    decks: DeckEntity[];

    @ManyToOne(() => UsersEntity, (user) => user.id)
    user_id: UsersEntity;

}