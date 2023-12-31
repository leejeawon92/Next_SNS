import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, generateDummyPost } from '../reducers/post';
import axios from 'axios';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import shortid from 'shortid';


function loadPostsAPI(data) {
  return axios.get('/api/posts', data);
}
function* loadPosts(action) {
  try {
    // const result = yield call(loadPostsAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}


function addPostAPI(data){
  return axios.post('/post',{ content: data}); 
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
      
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}


function addCommentAPI(data){
  return axios.post(`/post/${data.postId}/comment`,data); // POST /post/1/comment
}
function* addComment(action){
  try {
    const result = yield call(addCommentAPI ,action.data) 
    yield put({                         
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    }) 
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data
    }) 
  }
}


function removePostAPI(data) {
  return axios.delete('/api/post', data);
}
function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}


function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment(){
  yield takeLatest(ADD_COMMENT_REQUEST,addComment)
} 

function* watchRemovePost(){
  yield takeLatest(REMOVE_POST_REQUEST,removePost);
} 


export default function* postSaga() {
    yield all ([
      fork(watchLoadPosts),
      fork(watchAddPost),
      fork(watchAddComment),
      fork(watchRemovePost),
    ])
}