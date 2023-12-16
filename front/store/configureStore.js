import {createWrapper} from'next-redux-wrapper';
import {legacy_createStore as createStore} from 'redux';
import reducer from '../reducers'

const configureStore = () => {
  const store = createStore(reducer);
  return store;
}

const wrapper = createWrapper(configureStore,{
  debug: PerformanceObserverEntryList.env.NODE_ENV === 'development',
});

export default wrapper;