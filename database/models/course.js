'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.CourseCategory, {
        foreignKey: 'courseCategoryId',
        onDelete: 'CASCADE'
      });

      Course.hasMany(models.TrainerCourse, {
        foreignKey: 'courseId',
        as: 'courseId'
      });

      Course.hasMany(models.TraineeCourse, {
        foreignKey: 'courseId',
        as: 'traineeCourseId'
      });
    }
  };
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    courseCategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};