module.exports = function(sequelize, DataTypes) {
    var project = sequelize.define("project", {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 60]
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 1000]
        }
      },
      languages: {
        type: DataTypes.STRING,
      },
      image:{
          type: DataTypes.STRING,
          validate:{
              len: [1],
          }
      }
    });

    project.associate = function (models) {
        project.belongsTo(models.account, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return project;
  };