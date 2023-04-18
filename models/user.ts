"use strict";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import bcrypt from "bcryptjs";

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
  > {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: CreationOptional<number>;
    declare firstname: string;
    declare lastname: string;
    declare email: string;
    declare password: string;

    static associate(models: any) {
      // define association here
      User.hasMany(models.Loan);
      User.hasMany(models.Book);
      User.belongsToMany(models.Role, { through: "user_roles" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      modelName: "User",
      hooks: {
        beforeCreate: async (User) => {
          let salt = await bcrypt.genSalt(10);
          let hashedPassword = await bcrypt.hash(User.password, salt);
          User.password = hashedPassword;
          console.log(User);
        },
      },
      sequelize,
    }
  );
  return User;
};
