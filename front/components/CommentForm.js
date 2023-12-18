import { Button, Form, Input } from 'antd';
import { useCallback } from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CommentForm = ({post})=>{
  const id = useSelector((state)=> state.user.me?.id)
  const [commentText, onChangeCommentText] = useInput('')
  const onSubmitComment = useCallback(()=>{
    console.log(id, commentText);
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