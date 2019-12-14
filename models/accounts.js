// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var account = sequelize.define("account", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 25]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    github_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkedin_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    aboutMe: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 255]
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 35]
      }
    }
  });
  
  account.associate = function(models) {
    account.hasMany(models.porject, {
      onDelete: "cascade"
    });
  };
  
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  account.addHook("beforeCreate", function(account) {
    account.password = bcrypt.hashSync(account.password, bcrypt.genSaltSync(10), null);
  });
  
  return account;
};