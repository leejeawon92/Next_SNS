const express = require('express');
const {User, Post} = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

router.post('/login', (req, res, next)=>{ // POST /user/login
  passport.authenticate('local', (err, user, info)=>{  
    if(err) {
      console.error(err);
      return next(err);
    }
    if(info){
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr)=>{
      if(loginErr){
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({ // 패스워드정보를 뺀 유저정보
        where: { id: user.id },
        attributes: {
          exclude: ['password']  // 비밀번호를 빼겠다
        },
        include: [{
          model: Post,
        }, {
          model: User,
          as: 'Followings',
        }, {
          model: User,
          as: 'Followers',
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    })
  })(req,res, next) // 미들웨어 확장방법
});  

router.post('/', async (req, res, next)=>{ // POST /user/
  try{
    const exUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if(exUser) {
      return res.status(403).send('이미 사용중인 email입니다.')
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword
    });
    res.status(200).send('user 생성완료');

  } catch(error) {
    console.error(error);
    next(error); // next를 통해 브러우저로 error통보 = status 500
  }
})

module.exports = router;