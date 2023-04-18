"use strict";
import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class User_Roles extends Model<
    InferAttributes<User_Roles>,
    InferCreationAttributes<User_Roles>
  > {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare UserId: number;
    declare RoleId: number;

    static associate(models: any) {
      // define association here
      User_Roles.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      User_Roles.belongsTo(models.Role, {
        foreignKey: "RoleId",
      });
    }
  }
  User_Roles.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "User_Roles",
      tableName: "user_roles",
    }
  );
  return User_Roles;
};
