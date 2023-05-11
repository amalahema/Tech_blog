const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Comment extends Model {}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_body: {
        type: DataTypes.STRING,
        validate:{
            len: [3]
        }
    },
    //refer to usermodel id
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    //refer the postmodel id
    post_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }   
    }
 },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    });

module.exports = Comment;