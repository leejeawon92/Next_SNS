import { Button, Form, Input } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, addPost } from '../reducers/post';

const PostForm = () =>{
  const {imagePaths, addPostDone, addPostLoading} = useSelector((state)=> state.post);
  const dispatch = useDispatch();
  const [text, onChangeText ,setText] = useInput('');
  const imageInput = useRef();

  useEffect(()=>{
    if(addPostDone) {
      setText('')
    }
  },[addPostDone])

  const onSubmit = useCallback(()=>{
    dispatch(addPost(text));
  },[text])

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


  return (
    <Form style={{margin: '10px 0 20px'}} encType='multipart/form-data' onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder='내용을 입력하세요' />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' style={{float: 'rigth'}} htmlType='submit' loading={addPostLoading}>작성</Button>
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