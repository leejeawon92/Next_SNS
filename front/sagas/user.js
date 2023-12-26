import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from '../reducers/user';

function logInAPI(data){
  return axios.post('/api/login', data); // 실제 서버에 요청을 보낸다.
}
function logOutAPI(){
  return axios.post('/api/logout'); 
}
function signUpAPI(){
  return axios.post('/api/signup'); 
}

function* logIn(action){
  try {
    // const result = yield call(logInAPI, action.data) // 서버로 로그인에 관련된 요청(logInAPI)을 보내는 API를 따로 빼고 그에 따른 결과값을 전달받는다. 
    yield delay(1000);
    yield put({                         // logInAPI의 결과값이 실패냐 성공이냐에 따라 결과값이 달라진다.
      type: LOG_IN_SUCCESS,
      data: action.data
    }) 
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data
    }) 
  }
}

function* logOut(){
  try {
    // const result = yield call(logOutAPI)
    yield delay(1000)
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

function* signUp(){
  try {
    // const result = yield call(signUpAPI)
    yield delay(1000)
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

function* watchLogIn(){
  yield takeLatest(LOG_IN_REQUEST, logIn)  
}

function* watchLogOut(){
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}
function* watchSignUp(){
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga(){
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp)
  ])
}