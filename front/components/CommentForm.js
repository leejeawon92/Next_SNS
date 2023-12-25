import { Button, Form, Input } from 'antd';
import { useCallback } from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({post})=>{
  const dispatch = useDispatch();
  const id = useSelector((state)=> state.user.me?.id)
  const [commentText, onChangeCommentText] = useInput('')
  const onSubmitComment = useCallback(()=>{
    console.log(id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {content: commentText, postId: post.id, userId:id}
    })
  },[commentText])
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button type='primary' htmlType='submit'>게시</Button>
      </Form.Item>
    </Form>
  )
}
CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
}

export default CommentForm;