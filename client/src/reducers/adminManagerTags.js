const initialState = [{
    name: "首页",
    _id: "首页"
}];

export const actionTypes = {
    GET_ALL_TAGS: "GET_ALL_TAGS",
    SET_TAGS: "RESPONSE_GET_ALL_TAGS",
    DELETE_TAG: "DELETE_TAG",
    ADD_TAG: "ADD_TAG"
};

export const actions = {
    get_all_tags: function () {
        return {
            type: actionTypes.GET_ALL_TAGS
        }

    }
}

export function reducer(state=initialState, action) {
    switch (action.type) {
        case actionTypes.SET_TAGS:
            return [
                    {
                        name: "首页",
                        _id: "首页"
                    }, ...action.data
                ]
        default:
            return state;
    }
}