const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hashtag extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    }, {
      modelName: 'Hashtag',
      tableName: 'hashtags',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', 
      sequelize,
    });
  }
  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  }
};


// module.exports = (sequelize, DataTypes) => {
//   const Hashtag = sequelize.define('Hashtag', { // sequelize특성으로 User가 users테이블 생성된다.
//     name: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//   },{
//     charset: 'utf8mb4',
//     collate: 'utf8mb4_general_ci', // 한글+이모티콘

//   })
//   Hashtag.associate = (db)=> {
//     db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'}); // 해시태그는 여러개의 post를 가진다. (다대다 관계)
//   };
//   return Hashtag;
// }