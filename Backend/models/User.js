const { DataTypes } = require("sequelize");  
const sequelize = require("../config/database");

const Users = sequelize.define('User', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,    
    allowNull: false,  
    validate: {
      isEmail: true,   
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,   
  },
  role: {
    type: DataTypes.ENUM('user', 'manager', 'admin'), 
    allowNull: false,
    defaultValue: 'admin', 
  }
}, {
  tableName: "Users",    
  timestamps: true,      
});

module.exports = Users;
