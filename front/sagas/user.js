import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { 
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, 
  LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, 
  LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, 
  LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, 
  SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, 
  UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS 
} from '../reducers/user';

function logInAPI(data){
  return axios.post('/user/login', data); // 실제 서버에 요청을 보낸다.
}
function* logIn(action){
  try {
    const result = yield call(logInAPI, action.data); // 서버로 로그인에 관련된 요청(logInAPI)을 보내는 API를 따로 빼고 그에 따른 결과값을 전달받는다. 
    yield put({                         // logInAPI의 결과값이 실패냐 성공이냐에 따라 결과값이 달라진다.
      type: LOG_IN_SUCCESS,
      data: result.data
    }) 
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data
    }) 
  }
}



function logOutAPI(){
  return axios.post('/user/logout'); 
}
function* logOut(){
  try {
    yield call(logOutAPI);
    yield put({                         
      type: LOG_OUT_SUCCESS,
    }) 
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data
    }) 
  }
}



function signUpAPI(data){
  return axios.post('/user', data); 
}
function* signUp(action){
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({                         
      type: SIGN_UP_SUCCESS,
    }) 
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data
    }) 
  }
}



function followAPI() {
  return axios.post('/api/follow');
}
function* follow(action) {
  try {
    // const result = yield call(followAPI);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}



function unfollowAPI() {
  return axios.post('/api/unfollow');
}
function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}


function loadMyInfoAPI() {
  return axios.get('/user');
}
function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}


function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}




function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn(){
  yield takeLatest(LOG_IN_REQUEST, logIn)  
}

function* watchLogOut(){
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}
function* watchSignUp(){
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}



export default function* userSaga(){
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadMyInfo),
    fork(watchChangeNickname),
  ])
}