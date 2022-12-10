const ShowsReducer = (state, action) => {
    switch (action.type) {
        case "GET_ALL_SHOWS":
            return {
                ...state,
                shows: action.payload,
            }
        case "GET_PLATFORMS":
            return {
                ...state,
                platforms: action.payload,
            }
        case "ADD_SHOW":
            return {
                ...state,
                newShow: action.payload,
            }
        case "ADD_PLATFORM":
            return {
                ...state,
                newPlatform: action.payload,
            }
        case "UPDATE_SHOW":
            return {
                ...state,
                newShow: action.payload,
            }
        case "DELETE_SHOW":
            return {
                ...state,
                newShow: action.payload,
            }
        case "SET_SELECTED":
            return {
                ...state,
                selectedShow: action.payload,
            }
        case "SORT_SHOWS":
            return {
                ...state,
                shows: action.payload,
            }
        case "FILTER_SHOWS":
            return {
                ...state,
                shows: action.payload,
            }
        case "SET_SORT_METHOD":
            return {
                ...state,
                sortMethod: action.payload,
            }
        case "SET_FILTER_METHOD":
            return {
                ...state,
                filterMethod: action.payload,
            }
        default:
            return state;
    }
}

export default ShowsReducer;