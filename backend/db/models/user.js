'use strict';
const {Validator} = require('sequelize')
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING(30),
      validate: {
        len: [4,30],
        isNotEmail(value) {
          if(Validator.isEmail(value)) throw new Error ('Cannot be an email.')
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { len: [3,256] }
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validate: { len: [60,60] }
    },
    owner: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      // defaultValue: false
    },
    profilePic: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
  },});

  User.associate = function(models) {
    User.hasMany(models.Checkin, {foreignKey: 'userId'})
    User.hasMany(models.FavoriteStrain, {foreignKey: 'userId'})
    User.hasMany(models.FavoriteDispensary, {foreignKey: 'userId'})
    User.hasMany(models.Comment, {foreignKey: 'userId'})
    User.hasOne(models.Dispensary, {foreignKey: 'ownerId'})
  };

  User.prototype.toSafeObject = function() {
    const { id, username, email } = this;
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };

   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };

   User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password, owner }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      owner
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
