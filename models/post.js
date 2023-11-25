module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        }
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    });
  
    Post.associate = function(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author',
        onDelete: 'CASCADE',
      });
  
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments',
        onDelete: 'CASCADE',
      });
    };
  
    return Post;
  };
  