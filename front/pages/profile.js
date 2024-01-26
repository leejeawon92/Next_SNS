import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Profile  = () => {
  const {me} = useSelector((state)=> state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

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
      <FollowList header='팔로워' data={me.Followers} />
      <FollowList header='팔로잉' data={me.Followings} />
    </AppLayout>
    </>
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

export default Profile;