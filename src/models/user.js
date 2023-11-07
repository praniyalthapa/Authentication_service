'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email:{type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
 
    },
  password: {type:DataTypes.STRING,       //https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
    allowNull:false,
    validate:{
      len:[3,18]
    }
  }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};