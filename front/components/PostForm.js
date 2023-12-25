import { Button, Form, Input } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () =>{
  const {imagePaths} = useSelector((state)=> state.post);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const imageInput = useRef();

  const onChangeText = useCallback((e)=>{
    setText(e.target.value);
  },[])

  const onSubmit = useCallback(()=>{
    dispatch(addPost(text));
    setText('');
  },[text])

  const onClickImageUpload = useCallback(()=>{
    imageInput.current.click();
  },[imageInput.current])


  return (
    <Form style={{margin: '10px 0 20px'}} encType='multipart/form-data' onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder='내용을 입력하세요' />
      <div>
        <input type='file' multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' style={{float: 'rigth'}} htmlType='submit'>작성</Button>
      </div>
      <div>
        {imagePaths.map((v)=> {
          <div key={v} style={{display: 'inline-block'}}>
            <img src={v} style={{width: '280px'}} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        })}
      </div>
    </Form>
  )
}
export default PostForm;