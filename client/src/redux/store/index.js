import {
  createStore,
  applyMiddleware
} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';



const configureStore = (initState = {}) => {
  const store = createStore(
    reducer,initState, applyMiddleware(thunk)
  );
  return store
}
export default configureStore;