import { createStore,applyMiddleware,compose} from 'redux';
import reducer from '../../client/src/redux/reducers';
import thunk from 'redux-thunk';

const getCreateStore = () =>{
    const initialState = {};
    const middleware = [thunk];
	const composedEnhancers = compose(applyMiddleware(...middleware));
    const  store = createStore(reducers, initialState, composedEnhancers);
}
export default getCreateStore;