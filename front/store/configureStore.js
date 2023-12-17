import {createWrapper} from'next-redux-wrapper';
import {applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers'

const configureStore = (context) => {
  console.log(context);
  const middlewares = [];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
 
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore,{
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;