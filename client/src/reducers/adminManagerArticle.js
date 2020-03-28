
const initialState = {
    articleList: [],
    pageNum:1,
    total: 0
}

export const actionTypes = {
    ADMIN_GET_ARTICLE_LIST: "ADMIN_GET_ARTICLE_LIST",
    ADMIN_RESPONSE_GET_ARTICLE_LIST: 'ADMIN_RESPONSE_GET_ARTICLE_LIST',
    ADMIN_ADD_ARTICLE: "ADMIN_ADD_ARTICLE"

}

export const actions = {
    get_article_list: function (pageNum=1) {
        return {
            type: actionTypes.ADMIN_GET_ARTICLE_LIST,
            pageNum
        }
    },
    add_article: function (datas){
        return {
            type: actionTypes.ADMIN_ADD_ARTICLE,
            datas
        }
    }
}

export function articles(state=initialState, action) {
    switch (action.type) {
        case actionsTypes.ADMIN_RESPONSE_GET_ARTICLE_LIST:
            return {
                ...state, articleList:[...action.data.list], total: action.data.total, pageNum:action.data.pageNum
            };
    
        default:
            return state;
    }
}