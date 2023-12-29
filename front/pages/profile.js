import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const Profile  = () => {
  const {me} = useSelector((state)=> state.user);

  useEffect(() => {
    if (!(me && me.id)) {  // 로그인 안한채로 프로필페이지 갈때
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }

  return (
    <>
    <Head>
      <title>내 프로필 | SNS </title>
    </Head>
    <AppLayout>
      <NicknameEditForm />
      <FollowList header='팔로워 목록' data={me.Followers} />
      <FollowList header='팔로잉 목록' data={me.Followings} />
    </AppLayout>
    </>
  )
}

export default Profile;