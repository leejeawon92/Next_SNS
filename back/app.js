const express = require('express');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const app = express();
const cors = require('cors');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));

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

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({
    origin: 'http://nextSNS.com',
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}

app.use('/', express.static(path.join(__dirname, 'uploads')));
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
app.use('/posts',postsRouter);
app.use('/user',userRouter);
app.use('/hashtag',hashtagRouter);

app.listen(3065, ()=>{
  console.log('서버 실행중');
})