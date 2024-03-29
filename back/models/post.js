const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      modelName: 'Post',
      tableName: 'posts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', 
      sequelize,
    });
  }
  static associate(db) {
    db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags
    db.Post.hasMany(db.Comment); // post.addComments, post.getComments
    db.Post.hasMany(db.Image); // post.addImages, post.getImages
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }) // post.addLikers, post.removeLikers
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // post.addRetweet
  }
};


// module.exports = (sequelize, DataTypes) => {
//   const Post = sequelize.define('Post', { // sequelize특성으로 User가 users테이블 생성된다.
//     content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//   },{
//     charset: 'utf8mb4',
//     collate: 'utf8mb4_general_ci', // 한글+이모티콘

//   })
//   Post.associate = (db)=> {
//     db.Post.belongsTo(db.User); // post는 user에 속해있다.
//     db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post는 게시글이 여러개 있다.(다대다 관계)
//     db.Post.hasMany(db.Comment); // post에는 여러개의 comment를 할 수 있다.
//     db.Post.hasMany(db.Image); // post에는 여러개의 image를 할 수 있다.
//     db.Post.belongsToMany(db.User, {through: 'Like', as: 'Likers'}); // post는 여러User로 부터 좋아요를 받을 수 있다.
//     db.Post.belongsTo(db.Post, { as: 'Retweet' });
//   };
//   return Post;
// }