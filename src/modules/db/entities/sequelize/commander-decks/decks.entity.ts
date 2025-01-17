import { DataTypes, Model, Sequelize } from 'sequelize';
import { TournamentModel } from './tournaments.entity';

class DeckModel extends Model {
  public id!: number;
  public name!: string;
  public deckname!: string;
  public tournament_id!: number;
  public wins!: number;
  public losses!: number;
  public draws!: number;
}

export function initializeDeckModel(sequelize: Sequelize) {
  DeckModel.init(
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
      deckname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tournament_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      wins: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      losses: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      draws: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'decks',
    }
  );
  TournamentModel.hasMany(DeckModel, {
    foreignKey: 'tournament_id',
    as: 'tournament',
  })
}

export default DeckModel;