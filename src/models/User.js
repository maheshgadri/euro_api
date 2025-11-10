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

//   googleId: {
//   type: DataTypes.STRING,
//   allowNull: true,
//   unique: true,
// },

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
    type: DataTypes.STRING, // store as array
    allowNull: true
  },
  photos: {
    type: DataTypes.JSON, // array of URLs
    allowNull: true
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isProfileComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },


  preferences: {
  type: DataTypes.JSON, // Store as structured object
  allowNull: true,
  defaultValue: {
    minAge: 18,
    maxAge: 99,
    lookingFor: [],
    relationshipType: null,
    hasChildren: null,
    smoking: null,
    alcohol: null,
    diet: null
  }
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
