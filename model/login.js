
const { Model, DataTypes } = require('sequelize');//importing the Model and DataTypes objects from the Sequelize library.
const bcrypt = require('bcrypt');//library to hash password
const sequelize = require('../config/connection');//import sequelize object from the config file(connection for db)


class Login extends Model{

}
//sequelize table
Login.init({
    //tablecolumn name id set as primarykey
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    //property of sequelize
    //newUserData passed as an parameter
    //beforeCreate and beforeUpdate is the hook functions
    hook: 
    {
      beforeCreate:async(newUserData) =>
      {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        }
        return updatedUserData;
      },
    
    },
},
    //Link to DB connection
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'Login',
    }

);
module.exports = Login;