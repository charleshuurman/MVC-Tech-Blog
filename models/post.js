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
        allowNull: true, // Allowing null so the image is optional
        validate: {
          isUrl: true, // Validates that the input is a URL
        }
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true, // Allowing null so the URL is optional
        validate: {
          isUrl: true, // Validates that the input is a URL
        }
      }
    });
  
    Post.associate = function(models) {
      // Associations
      // A Post belongs to a User
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author',
        onDelete: 'CASCADE',
      });
  
      // A Post can have many Comments
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments',
        onDelete: 'CASCADE',
      });
    };
  
    return Post;
  };
  