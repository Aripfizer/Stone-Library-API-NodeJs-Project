'use strict';
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, UUIDV4 } from 'sequelize';
 
module.exports = (sequelize:any, DataTypes:any) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare id: CreationOptional<string>;
    declare title: string;
    declare isbn: string;
    declare resume: string;
    declare content: string;
    declare status: boolean;
    declare is_valid: boolean;
    declare loanStatus: boolean;
    declare published_at: Date;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;


    static associate(models:any) {
      // define association here
    }
  }
  Book.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    isbn:{
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }, 
    is_valid:  {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }, 
    loanStatus:  {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }, 
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }, 
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    tableName: 'books',
  });
  return Book;
};