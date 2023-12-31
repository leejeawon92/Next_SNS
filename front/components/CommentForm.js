import { Button, Form, Input } from 'antd';
import { useCallback, useEffect } from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({post})=>{
  const dispatch = useDispatch();
  const id = useSelector((state)=> state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('')

  useEffect(()=>{
    if(addCommentDone) {
      setCommentText('')
    }
  },[addCommentDone])

  const onSubmitComment = useCallback(()=>{
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {content: commentText, postId: post.id, userId:id}
    })
  },[commentText])


  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button type='primary' htmlType='submit' loading={addCommentLoading}>게시</Button>
      </Form.Item>
    </Form>
  )
}
CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
}

export default CommentForm;