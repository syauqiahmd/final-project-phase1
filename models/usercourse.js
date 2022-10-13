'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    get statusCourse() {
      if (this.isComplete === true) {
        return 'Clear'
      }
      return 'Ongoing'
    }

    get statusPayment() {
      if (this.paymentStatus === true) {
        return 'Paid'
      }
      return 'Unpaid'
    }

  }
  UserCourse.init({
    paymentStatus: DataTypes.BOOLEAN,
    isComplete: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserCourse',
  });
  return UserCourse;
};