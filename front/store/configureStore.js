import {createWrapper} from'next-redux-wrapper';
import {applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas'

const loggerMiddleware = ({dispath, getState}) => (next) => (action) => {
  console.log(action);
  return next(action)
}

const configureStore = () => {
  const SagaMiddleware =createSagaMiddleware();
  const middlewares = [SagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);
  store.sagaTask = SagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore,{
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;