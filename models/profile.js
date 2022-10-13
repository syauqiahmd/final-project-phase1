'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    get formattedDate() {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      let formattedDate = this.dateOfBirth.toLocaleDateString('id-ID', options)
      return formattedDate.split('/').reverse().join('-')
    }

  }
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First Name must be filled'
        },
        notNull: {
          msg: 'First Name must be filled'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last Name must be filled'
        },
        notNull: {
          msg: 'Last Name must be filled'
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Date Of Birth must be filled'
        },
        notNull: {
          msg: 'Date Of Birth must be filled'
        },
        isMinAge(value){
          if(!value){
            throw new Error('Date of birth required')
          } else {
            let today = new Date();
            let age = today.getFullYear() - value.getFullYear()
            if(age < 10){
              throw new Error('Age must be at least 10 years old')
            }
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};