module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      // Define attributes
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6], // minimum length for the password
        }
      }
    });
  
    User.associate = function(models) {
      // Associations 
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
        onDelete: 'CASCADE',
      });
  
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments',
        onDelete: 'CASCADE',
      });
    };
  
    return User;
  };
  