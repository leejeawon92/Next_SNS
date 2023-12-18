import { Avatar, Button, Card, Popover } from 'antd';
import {RetweetOutlined , HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import { useCallback, useState } from 'react';

const PostCard = ({post}) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpend, setcommentFormOpend] = useState(false);
  const id = useSelector((state) => state.user.me?.id);
  const onToggleLike = useCallback(()=>{
    setLiked((prev) => !prev);
  },[])
  const onToggleComment = useCallback(()=>{
    setcommentFormOpend((prev) => !prev);
  },[])
  
  return(
    <div>
      <Card 
        cover={post.Images[0] && <PostImages images={post.images} />}
        actions={[
          <RetweetOutlined key='retweet' />,
          liked ? <HeartTwoTone key='heart' twoToneColor='#eb2f96' onClick={onToggleLike} /> : <HeartOutlined key='heart' onClick={onToggleLike} /> ,
          <MessageOutlined key='comment' onClick={onToggleComment} />,
          <Popover 
            key='more' 
            content={(
              <Button.Group>
                { id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>               
                    <Button type='danger'>삭제</Button>  
                  </>
                ) : <Button>신고</Button>   
                }
              </Button.Group>
            )}>
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta avatar={<Avatar>{post.User.nickname[0]}</Avatar>} title={post.User.nickname} description={post.content} />
      </Card>
      {commentFormOpend && <div>댓글부분</div>}
    </div>
  )
}
PostCard.propTypes = {
  post: PropTypes.object.isRequired
}
export default PostCard;