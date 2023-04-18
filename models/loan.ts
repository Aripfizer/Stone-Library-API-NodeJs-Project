'use strict';
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, UUIDV4 } from 'sequelize';

module.exports = (sequelize:any, DataTypes:any) => {
  class Loan extends Model<InferAttributes<Loan>, InferCreationAttributes<Loan>>  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: CreationOptional<number>;
    declare loan_at: Date;
    declare return_at: Date;


    static associate(models:any) {
      // define association here
      Loan.belongsTo(models.User);
      Loan.belongsToMany(models.Book, { through: "loan_books" });
    }
  }
  Loan.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    loan_at: DataTypes.DATE,
    return_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Loan',
    tableName: 'loans'
  });
  return Loan;
};