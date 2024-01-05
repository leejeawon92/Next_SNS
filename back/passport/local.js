const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const {User} = require('../models');
const bcrypt = require('bcrypt');

module.exports= ()=>{
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done)=>{
    try {
      const user = await User.findOne({ 
        where: {email}  // 이메일 있는지 검사
      });
      if(!user){
        return done(null, false, {reason: '존재하지 않는 이메일입니다.'}) // 첫번쩨: 서버에러 , 두번째: 성공, 세번째: 클라이언트에러
      }
      const result = await bcrypt.compare(passport, user.password); // DB에 저장된 pw와 사용자가 입력한 pw 비교
      if(result){
        return done(null, user); // 이메일존재, 비번일치하면 로그인 성공임으로 사용자정보를 보낸다
      }
      return done(null, false, {reason: '비밀번호가 틀렸습니다.'}) // 이메일은 존재하지만 비밀번호에서 실패
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
}