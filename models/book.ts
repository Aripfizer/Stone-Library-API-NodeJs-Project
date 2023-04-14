'use strict';
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, UUIDV4 } from 'sequelize';
 
module.exports = (sequelize:any, DataTypes:any) => {
  class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare id: CreationOptional<number>;
    declare title: string;
    declare isbn: string;
    declare resume: string;
    declare content: string;
    declare status: boolean;
    declare is_valid: boolean;
    declare loanStatus: boolean;
    declare published_at: Date;

    static associate(models:any) {
      // define association here
      Book.belongsTo(models.User)
    }
  }
  Book.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  });
  return Book;
};