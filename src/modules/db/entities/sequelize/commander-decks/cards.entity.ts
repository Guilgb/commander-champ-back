import { DataTypes, Model, Sequelize } from 'sequelize';
import DeckModel from './decks.entity';

export class CardsModel extends Model {
  public id!: number;
  public deck_id: number;
  public name!: string;
  public cmc!: number;
  public type!: string;
  public mana_cost!: string;
  public colors!: string[];
  public color_identity!: string[];
}
export function initializeCardModel(sequelize: Sequelize) {
  CardsModel.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    deck_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cmc: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mana_cost: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    colors: {
      type: DataTypes.ARRAY(DataTypes.STRING(255)),
      allowNull: false
    },
    color_identity: {
      type: DataTypes.ARRAY(DataTypes.STRING(255)),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cards'
  })

  DeckModel.hasMany(CardsModel, {
    foreignKey: 'deck_id',
    as: 'cards'
  });
}