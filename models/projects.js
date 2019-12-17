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
      short_desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      long_desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 1000]
        }
      },
      project_img: {
        type: DataTypes.STRING,
        allowNull: true
      },
      project_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      languages: {
        type: DataTypes.STRING,
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