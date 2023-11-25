module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      // attributes
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },

    });
  
    Comment.associate = function(models) {
      // Associations can be defined here
      // A Comment belongs to a User
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author',
        onDelete: 'CASCADE',
      });
  
      // A Comment belongs to a Post
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
        onDelete: 'CASCADE',
      });
    };
  
    return Comment;
  };
  