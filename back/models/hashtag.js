module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { // sequelize특성으로 User가 users테이블 생성된다.
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글+이모티콘

  })
  Hashtag.associate = (db)=> {};
  return Hashtag;
}