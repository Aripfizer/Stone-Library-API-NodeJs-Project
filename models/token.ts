"use strict";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Token extends Model<
    InferAttributes<Token>,
    InferCreationAttributes<Token>
  > {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare id: CreationOptional<number>;
    declare value: string;

    static associate(models: any) {
      // define association here
      Token.belongsTo(models.User);
    }
  }
  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Token",
      tableName: "tokens",
    }
  );
  return Token;
};
