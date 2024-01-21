const express = require('express');
const {Post, Comment, Image, User, Hashtag} = require('../models');
const {isLoggedIn} = require('./middlewares');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const router = express.Router();


const upload = multer({
  storage: multer.diskStorage({ // 어디다가 저장할 것인가(diskStorage=하드디스크)
    destination(req, file, done) {
      done(null, 'uploads'); // uploads라는 폴더에 저장할 것이다
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출
      const basename = path.basename(file.originalname, ext); // 파일명 추출
      done(null, basename + '_' + new Date().getTime() + ext); // 파일명완성본: "파일명+날짜.png"
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 파일크기 제한: 20MB
});

//===================================================================================================

router.post('/', isLoggedIn, upload.none(), async(req, res, next)=>{  // POST /post
  try{
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); 
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) { // 이미지가 있는 경우
      if (Array.isArray(req.body.image)) { // 이미지를 여러 개 올리게 되면 req.body.image가 "[이미지1.png, 이미지2.png]" 형태로 만들어진다.
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);

      } else { // 이미지를 하나만 올리게 되면 req.body.image가 "이미지.png" 형태가 된다.
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: {id: post.id},
      include: [{
        model: Image,
      }, {
        model: User, // 게시글 작성자
        attributes:['id', 'nickname']
      }, {
        model: Comment,  // 댓글 작성사
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      },{
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }]
    })
    res.status(201).json(fullPost);
    
  } catch(error){
    console.error(error);
    next(error);
  }
})
//===================================================================================================

router.post('/:postId/comment',isLoggedIn ,async(req, res, next)=>{  // POST /post/x/comment
  try{
    const post = await Post.findOne({
      where: {id: req.params.postId}
    })
    if(!post){
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId,10),
      UserId: req.user.id,
    })    
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(201).json(fullComment);
  } catch(error){
    console.error(error);
    next(error);
  }
})
//===================================================================================================

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/x/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//===================================================================================================

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/x/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//===================================================================================================

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/x
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//===================================================================================================

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});
//===================================================================================================

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => { // POST /post/x/retweet
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: Post,
        as: 'Retweet',
      }],
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }
    const retweet = await Post.create({ // 리트윗가능한 게시글
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet', // 모델에서 비워두면 안되기 때문에 설정한 것(사실 리트윗할 때 content들어갈건 없다)
    });
    const retweetWithPrevPost = await Post.findOne({ // 어떤 게시글을 리트윗하였는지 포함
      where: { id: retweet.id },
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User, 
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }],
    })
    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;