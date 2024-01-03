module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // sequelize특성으로 User가 users테이블 생성된다.
    // id는 기본적으로 들어가 있기 때문에 생성해줄 필요가 없다
    email: {
      type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // 필수
    },
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장

  })
  User.associate = (db)=> {
    db.User.hasMany(db.Post); //user는 post를 여러개 가질 수 있다.
    db.User.hasMany(db.Comment); // user는 Comment를 여러개 가질 수 있다
    db.User.belongstoMany(db.Post, {through: 'Like', as: 'Liked'}); // user는 여러post를 좋아요 할 수 있다.
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  };
  return User;
}