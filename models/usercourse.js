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

    get formattedDate(){
      return this.createdAt.toLocaleDateString('en-GB').split('/').reverse().join('-');
    }

  }
  UserCourse.init({
    paymentStatus: DataTypes.BOOLEAN,
    isComplete: DataTypes.BOOLEAN,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'User must be filled'
        },
        notNull: {
          msg: 'User must be filled'
        }
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Course must be filled'
        },
        notNull: {
          msg: 'Course must be filled'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserCourse',
  });
  UserCourse.beforeCreate((userCourse, options) => {
    userCourse.paymentStatus = false,
    userCourse.isComplete = false
  })
  return UserCourse;
};