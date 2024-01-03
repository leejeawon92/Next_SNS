module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { // sequelize특성으로 User가 users테이블 생성된다.
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글+이모티콘

  })
  Comment.associate = (db)=> {
    db.Comment.belongsTo(db.User); // Comment는 user에 속해있다.
    db.Comment.belongsTo(db.Post); // Comment는 post에 속해있다.
  };
  return Comment;
}