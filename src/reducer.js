const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "GET_STORIES":
            return {
                ...state,
                isLoading: false,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages, 
                // is use to get the totoal number of pages
            };
        case "REMOVE_POST":
            return {
                ...state,
                hits: state.hits.filter(
                    (curElem) => curElem.objectID !== action.payload
                ),
            };
        case "SEARCH_QUERY":
            return {
                ...state,
                query: action.payload,
                // paste the same name as payload value in the context.js
            };

        case "NEXT_PAGE":
            let pageNumInc = state.page + 1;

            if (pageNumInc >= state.nbPages) {
                pageNumInc = 0;
            }
            return {
                ...state,
                page: pageNumInc,
            };

        case "PREV_PAGE":
            let pageNum = state.page - 1;

            if (pageNum <= 0) {
                pageNum = 0;
            }

            return {
                ...state,
                page: pageNum,
            };
            default: return state;
        // you can add the default case too
    }
};

export default reducer;
