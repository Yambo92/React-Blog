
const initialState = {
    list: [],
    pageNum: 1,
    total: 0
};

export const actionTypes = {
    'GET_ALL_USER': "GET_ALL_USER",
    "RESOLVE_GET_ALL_USERS":"RESOLVE_GET_ALL_USERS",
    "DEL_USER": "DEL_USER",
    "CHANGE_ROLE": "CHANGE_ROLE"
};

export const actions = {
    get_all_users: function (pageNum=1) {
        return {
            type: actionTypes.GET_ALL_USER,
            pageNum: pageNum
        }
    },
    del_user: function (ids) {
        return {
            type: actionTypes.DEL_USER,
            ids
        }
    },
    change_role: function(_id, type){
        return {
            type: actionTypes.CHANGE_ROLE,
            datas: {_id, type}
        }
    }
}

export function users(state=initialState, action) {
    switch (action.type){
        case actionTypes.RESOLVE_GET_ALL_USERS:
            return {
                list: action.data.list,
                total: Number(action.data.total)
            };
        default:
            return state;
    }
}