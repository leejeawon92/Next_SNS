import {all, call, fork, put, take, takeEvery, takeLatest} from 'redux-saga/effects';

function logInAPI(data){
  return axios.post('/api/login', data); // 실제 서버에 요청을 보낸다.
}

function* logIn(action){
  try {
    const result = yield call(logInAPI, action.data) // 서버로 로그인에 관련된 요청(logInAPI)을 보내는 API를 따로 빼고 그에 따른 결과값을 전달받는다. 
    yield put({                         // logInAPI의 결과값이 실패냐 성공이냐에 따라 결과값이 달라진다.
      type: 'LOG_IN_SUCCESS',
      data: result.data
    }) 
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data
    }) 
  }
}

function logOutAPI(){
  return axios.post('/api/logout'); 
}

function* logOut(){
  try {
    const result = yield call(logOutAPI) 
    yield put({                         
      type: 'LOG_OUT_SUCCESS',
      data: result.data
    }) 
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data
    }) 
  }
}

function addPostAPI(data){
  return axios.post('/api/post',data); 
}

function* addPost(action){
  try {
    const result = yield call(addPostAPI,action.data) 
    yield put({                         
      type: 'ADD_POST_SUCCESS',
      data: result.data
    }) 
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data
    }) 
  }
}
function* watchLogin(){
  yield takeLatest('LOG_IN_REQUEST', logIn)  
}

function* watchLogOut(){
  yield takeLatest('LOG_OUT_REQUEST', logOut)
}

function* watchAddPost(){
  yield takeLatest('ADD_POST_REQUEST',addPost)
}

export default function* rootSaga() {
    yield all ([
      fork(watchLogin),
      fork(watchLogOut),
      fork(watchAddPost)
    ])
}