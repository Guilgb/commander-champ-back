import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "tournaments" })
export class TournamentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name!: string;

    @Column({ type: "date", nullable: false })
    start_date!: Date;

    @Column({ type: "date", nullable: false })
    end_date!: Date;

    @Column({ type: "enum", enum: ["c500", "cedh", "casual", "conquest"], nullable: false })
    format!: string;
}