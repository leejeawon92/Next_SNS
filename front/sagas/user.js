import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data){
  return axios.post('/api/login', data); // 실제 서버에 요청을 보낸다.
}
function logOutAPI(){
  return axios.post('/api/logout'); 
}

function* logIn(action){
  try {
    // const result = yield call(logInAPI, action.data) // 서버로 로그인에 관련된 요청(logInAPI)을 보내는 API를 따로 빼고 그에 따른 결과값을 전달받는다. 
    yield delay(1000);
    yield put({                         // logInAPI의 결과값이 실패냐 성공이냐에 따라 결과값이 달라진다.
      type: 'LOG_IN_SUCCESS',
      data: action.data
    }) 
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data
    }) 
  }
}

function* logOut(){
  try {
    yield delay(1000)
    yield put({                         
      type: 'LOG_OUT_SUCCESS',
    }) 
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data
    }) 
  }
}
function* watchLogIn(){
  yield takeLatest('LOG_IN_REQUEST', logIn)  
}

function* watchLogOut(){
  yield takeLatest('LOG_OUT_REQUEST', logOut)
}
export default function* userSaga(){
  yield all([
    fork(watchLogIn),
    fork(watchLogOut)
  ])
}