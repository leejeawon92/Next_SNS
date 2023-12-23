import React, { useCallback } from 'react';
import {Card, Avatar,Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile  = () => {
  const dispatch = useDispatch();
  const {user, isLoggingOut} = useSelector((state)=> state.user)
  const onLogOut = useCallback(()=>{
    dispatch(logoutRequestAction());
  }, [])

  return (
    <Card actions={[
      <div key='twit'>게시<br/></div>,
      <div key='followings'>팔로워<br/>0</div>,
      <div key='followings'>팔로잉<br/>0</div>
    ]}>
      <Card.Meta avatar={<Avatar>{user.nickname[0]}</Avatar>} title={user.nickname} />
      <Button onClick={onLogOut} loading={isLoggingOut}>로그아웃</Button>
    </Card>

  )
}

export default UserProfile;