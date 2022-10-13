'use strict';
const {
  Model
} = require('sequelize');
const {getCurrency} = require('../helpers/formating')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category)

      Course.belongsToMany(models.User, {
        through: models.UserCourse
      })
    }

    static getCourseByCategory(category){
      let option = {
        order : [['name', 'ASC']],
      }
      if(category){
        option.where = {
          CategoryId: category
        }
      }
      console.log('model-----', option)
      return option
    }
    
    get getAge(){
      let today = new Date();
      let age = today.getFullYear() - this.dateOfBirth.getFullYear();
      return age
    }

    get pricingFormatted(){
      return getCurrency(this.price)
    }

  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};