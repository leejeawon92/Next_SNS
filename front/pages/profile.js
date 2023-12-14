import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile  = () => {
  const followerList = [{nickname: '더미1'}, {nickname: '더미2'}, {nickname: '더미3'}]
  const followingList = [{nickname: '더미11'}, {nickname: '더미22'}, {nickname: '더미33'}]
  

  return (
    <>
    <Head>
      <title>내 프로필 | SNS </title>
    </Head>
    <AppLayout>
      <NicknameEditForm />
      <FollowList header='팔로워 목록' data={followerList} />
      <FollowList header='팔로잉 목록' data={followingList} />
    </AppLayout>
    </>
  )
}

export default Profile;