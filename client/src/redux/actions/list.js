import axios from 'axios';
import api from '../../common/api';

export const booklist = (result) => ({
    type: 'BOOKLIST',
    data: result
});

/**
 * 获取书籍目录
 * @param {*} param 
 */
export const fetchBookList = (params) => {
    return (dispatch, getState) => {
        axios.get(api.url.booklist, {
            params: params
        }).then((res) => {
            dispatch(booklist(res.data.result));
        }).catch((err) => {

        })
    }
}