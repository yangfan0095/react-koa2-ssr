import {
    combineReducers
} from 'redux';
import {
booklist
} from './list';

const appReducer = combineReducers({
    booklist,
})

export default appReducer
