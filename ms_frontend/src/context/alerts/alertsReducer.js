const alertsReducer = (state, action) => {
    switch (action.type) {
        case "SET_ALERT":
            return action.payload;
        case "CLEAR_ALERT":
            return action.payload;
        case "REMOVE_ALERT":
            //not used
            return null;
        default:
            return state;
    }
};

export default alertsReducer;