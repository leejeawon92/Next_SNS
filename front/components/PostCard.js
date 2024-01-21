import { Avatar, Button, Card, Popover, List} from 'antd';
import {RetweetOutlined , HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import { useCallback, useState } from 'react';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({post}) => {
  const dispatch = useDispatch();
  const {removePostLoading} = useSelector((state)=> state.post);
  const [commentFormOpend, setcommentFormOpend] = useState(false);
  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers.find((v)=> v.id === id);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(()=>{
    setcommentFormOpend((prev) => !prev);
  },[])

  const onRemovePost  = useCallback(()=> {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    })
  },[])

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);  

  return(
    <div>
      <Card 
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key='retweet' onClick={onRetweet} />,
          liked 
            ? <HeartTwoTone key='heart' twoToneColor='#eb2f96' onClick={onUnlike} /> 
            : <HeartOutlined key='heart' onClick={onLike} /> ,
          <MessageOutlined key='comment' onClick={onToggleComment} />,
          <Popover 
            key='more' 
            content={(
              <Button.Group>
                { id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>               
                    <Button type='danger' loading={removePostLoading} onClick={onRemovePost}>삭제</Button>  
                  </>
                ) : <Button>신고</Button>   
                }
              </Button.Group>
            )}>
            <EllipsisOutlined />
          </Popover>
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta 
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>} 
          title={post.User.nickname} 
          description={<PostCardContent postData={post.content} />} 
        />
      </Card>
      {commentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout='horizontal'
            dataSource={post.Comments || []}
            renderItem={(item)=> (
              <List.Item>
                <List.Item.Meta
                  title={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </div>
      )}
      {/* {commentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout='horizontal'
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={`/user/${item.User.id}`} prefetch={false}>
                      <Avatar>{item.User.nickname[0]}</Avatar>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )} */}
    </div>
  )
}
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};
export default PostCard;