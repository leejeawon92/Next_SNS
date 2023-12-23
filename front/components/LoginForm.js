import React, { useCallback, useState } from 'react';
import {Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`

const LoginForm  = () => {
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const {isLoggingIn} = useSelector((state)=> state.user);

  const onSubmitForm = useCallback((e) => {
    dispatch(loginRequestAction({id, password}));
  },[id, password])

  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor ='user-id'>아이디</label>
        <br/>
        <Input name='user-id' value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor ='user-password'>비밀번호</label>
        <br/>
        <Input name='user-id' value={password} onChange={onChangePassword} required />        
      </div>
      <ButtonWrapper>
        <Button type='primary' htmlType='submit' loading={isLoggingIn}>로그인</Button>
        <Link href='/signup'><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </Form>
  )
}
export default LoginForm;