module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // Timestamps
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    });
  
    Comment.associate = function(models) {
        Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE',
        });
    
        Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'post',
            onDelete: 'CASCADE',
        });
    };

    // Post.hasMany(Comment, { as: 'comments' });
    // Comment.belongsTo(Post);
    
    return Comment;
  };
  