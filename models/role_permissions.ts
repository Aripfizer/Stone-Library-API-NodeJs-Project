"use strict";
import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Role_Permissions extends Model<
    InferAttributes<Role_Permissions>,
    InferCreationAttributes<Role_Permissions>
  > {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare RoleId: number;
    declare PermissionId: number;

    static associate(models: any) {
      // define association here
      Role_Permissions.belongsTo(models.Role, {
        foreignKey: "RoleId",
      });
      Role_Permissions.belongsTo(models.Permission, {
        foreignKey: "PermissionId",
      });
    }
  }
  Role_Permissions.init(
    {
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      PermissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
    },
    {
      sequelize,
      modelName: "Role_Permissions",
      tableName: "role_permissions",
    }
  )
  return Role_Permissions;
};
