const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },

  googleId: {
  type: DataTypes.STRING,
  allowNull: true,
  unique: true,
},

  displayName: DataTypes.STRING,
  dob: DataTypes.DATE,
  gender: {
    type: DataTypes.ENUM(
      'Male', 'Female', 'Non-binary', 'Transgender', 'Intersex', 'Other', 'Prefer not to say'
    ),
    defaultValue: 'Prefer not to say'
  },
  genderIdentity: DataTypes.STRING,
  sexualOrientation: {
    type: DataTypes.ENUM(
      'Straight', 'Gay', 'Lesbian', 'Bisexual', 'Pansexual', 'Asexual', 'Queer', 'Questioning', 'Other', 'Prefer not to say'
    ),
    defaultValue: 'Prefer not to say'
  },
  pronouns: DataTypes.STRING,
  interestedIn: {
    type: DataTypes.JSON, // store as array
    allowNull: true
  },
  about: DataTypes.TEXT,
  photos: {
    type: DataTypes.JSON, // store array of URLs
    allowNull: true
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastLogin: DataTypes.DATE
  
});

module.exports = User;
