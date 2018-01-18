const defaultPagination = {
    "total": 0,
    "current_page": 1,
    "total_page": 0,
    "page_size": 14
};

const booklist = (state = {
    list: [],
    pagination: defaultPagination
}, action) => {
    switch (action.type) {
        case 'BOOKLIST':
            let res = {
                pagination: action.data ? action.data.pagination : defaultPagination,
                list: action.data ? state.list.concat(action.data.list) : state.list
            };
            state = res;
            return state;
        default:
            return state;
    }
};

export {
    booklist
};