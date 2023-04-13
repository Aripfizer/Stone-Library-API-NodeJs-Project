'use strict';
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, UUIDV4 } from 'sequelize';


// type UserAttributes = {
//   id: string,
//   fullname: string,
//   email: string,
//   password: string,
// };


module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: CreationOptional<string>;
    declare fullname: string;
    declare email: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
  

    static associate(models:any) {
      // define association here
      // User.belongsToMany(models.Book, {
      //   through: "BookAssignment"
      // })

      // User.belongsToMany(models.Loan, {
      //   through: "LoanAssignment"
      // })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,

    }, 
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
{
  tableName: 'users',
  sequelize // passing the `sequelize` instance is required
}
  );
  return User;
};