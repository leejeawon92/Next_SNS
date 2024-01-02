module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', { // sequelize특성으로 User가 users테이블 생성된다.
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글+이모티콘

  })
  Image.associate = (db)=> {};
  return Image;
}