import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import {Form, Input, Checkbox, Button} from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'; 
import wrapper from '../store/configureStore';

const ErrorMessage = styled.div`
  color: red;
`

const Signup  = () => {
  const dispatch = useDispatch();
  const {signUpLoading, signUpDone, signUpError} = useSelector((state)=> state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(()=>{
    if(signUpDone) {
      Router.push('/')
    }
  },[signUpDone])

  useEffect(()=>{
    if(signUpError) {
      alert(signUpError);
    }
  }, [signUpError])

  const onChangePasswordCheck = useCallback((e)=> {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password])

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e)=>{
    setTerm(e.target.checked);
    setTermError(false)
  })

  


  const onsubmit = useCallback(() =>{
    if(password !==passwordCheck) {
      return setPasswordError(true);
    }
    if(!term) {
      return setTermError(true);
    }
    
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname}
    })
  },[email, password, term, passwordCheck]) 

  return ( 
    <AppLayout>
      <Head>
        <title>회원가입 | SNS </title>
      </Head>
      <Form onFinish={onsubmit}>
        <div>
          <label htmlFor='user-id'>이메일</label>
          <br />
          <Input name='user-id' value={email} type='email' required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor='user-nick'>닉네임</label>
          <br />
          <Input name='user-nick' value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input name='user-password' value={password} type='password' required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor='user-password-check'>비밀번호 확인</label>
          <br />
          <Input name='user-password-check' value={passwordCheck} type='password' required onChange={onChangePasswordCheck} />
          {passwordError && <ErrorMessage>패스워드가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관동의</Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
        </div>
      </Form>
    </AppLayout>

  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Signup;