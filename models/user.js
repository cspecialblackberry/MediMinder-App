const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    console.log(loginPw, this.password)
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    wake_up_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    breakfast_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lunch_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dinner_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bed_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 14],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;