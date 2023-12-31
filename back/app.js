const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const app = express();
const cors = require('cors');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

db.sequelize.sync()
.then(()=>{
  console.log('db 연결 성공');
})
.catch(console.error)

passportConfig();
dotenv.config();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res)=>{
  res.send('Home페이지')
})

app.use('/post',postRouter);
app.use('/user',userRouter);

app.listen(3065, ()=>{
  console.log('서버 실행중');
})