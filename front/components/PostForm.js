import { Button, Form, Input } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST, addPost } from '../reducers/post';

const PostForm = () =>{
  const {imagePaths, addPostDone} = useSelector((state)=> state.post);
  const dispatch = useDispatch();
  const [text, onChangeText ,setText] = useInput('');
  const imageInput = useRef();

  useEffect(()=>{
    if(addPostDone) {
      setText('')
    }
  },[addPostDone])

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }

    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  // const onSubmit = useCallback(() => {
  //   dispatch({
  //     type: ADD_POST_REQUEST,
  //     data: text,
  //   });
  // }, [text]);

  const onClickImageUpload = useCallback(()=>{
    imageInput.current.click();
  },[imageInput.current])

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  }, []);

  return (
    <Form style={{margin: '10px 0 20px'}} encType='multipart/form-data' onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder='내용을 입력하세요' />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' style={{float: 'rigth'}} htmlType='submit'>작성</Button>
      </div>
      <div>
        {imagePaths.map((v,i)=> (
          <div key={v} >
            <img src={`http://localhost:3065/${v}`} style={{width: '200px'}} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  )
}
export default PostForm;