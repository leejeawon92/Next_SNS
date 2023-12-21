import { Avatar, Button, Card, Popover, List} from 'antd';
import {RetweetOutlined , HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import { useCallback, useState } from 'react';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

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
        cover={post.Images[0] && <PostImages images={post.Images} />}
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
            dataSource={post.Comments}
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
    </div>
  )
}
PostCard.propTypes = {
  post: PropTypes.object.isRequired
}
export default PostCard;