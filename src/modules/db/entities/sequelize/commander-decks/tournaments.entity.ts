import { DataTypes, Model } from "sequelize";

export class TournamentModel extends Model {
    public id!: number;
    public name!: string;
    public start_date!: Date;
    public end_date!: Date;
    public format!: string;
}

export function initializeTournamentModel(sequelize: any) {
    TournamentModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            format: {
                type: DataTypes.ENUM("c500", "cedh", "casual", "conquest",),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "tournaments",
        }
    );
}