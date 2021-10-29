'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trainee.hasMany(models.TraineeCourse, {
        foreignKey: 'traineeId',
        as: 'traineeId'
      })
    }
  };
  Trainee.init({
    fullname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    dateOfBirth: DataTypes.STRING,
    education: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Trainee',
  });
  return Trainee;
};