"use strict";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Role extends Model<
    InferAttributes<Role>,
    InferCreationAttributes<Role>
  > {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare id: CreationOptional<number>;
    declare name: string;

    static associate(models: any) {
      // define association here
      Role.belongsToMany(models.Permission, { through: "role_permissions" });

    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles"
    }
  );
  return Role;
};
