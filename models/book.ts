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
    declare quantity: number;
    declare resume: Text;
    declare isValid: boolean;
    declare status: boolean;
    declare publishedAt: Date;

    static associate(models:any) {
      // define association here
      Book.belongsTo(models.User);
      Book.belongsToMany(models.Loan, { through: "loan_books" });
    }
  }
  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      resume: {
        type: DataTypes.TEXT,
      },
      isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  });
  return Book;
};