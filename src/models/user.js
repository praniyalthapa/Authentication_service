'use strict';
const {
  Model
} = require('sequelize');
const {SALT}=require('../config/serverConfig');
const bcrypt=require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role,{   //https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
        through:'User_Roles',//By passing a string to through above, we are asking Sequelize to automatically generate a model named User_Roles as the through table 
      })
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
//making trigger of our database and beforeCreate is a hook/trigger which accepts a callback function
User.beforeCreate((user)=>{
  const encryptedPassword=bcrypt.hashSync(user.password,SALT);
  user.password=encryptedPassword;
});


  return User;
};