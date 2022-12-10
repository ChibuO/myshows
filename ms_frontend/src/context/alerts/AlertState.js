import {useReducer} from 'react';
import alertsContext from './AlertContext';
import alertsReducer from './alertsReducer';

const AlertState = (props) => {
    const initialState = null;

    const [state, dispatch] = useReducer(alertsReducer, initialState);

    const setAlert = (message) => {
        dispatch({
            type: "SET_ALERT",
            payload: {
                message,
                clear: false,
            },
        });

        //give okay to hide alert, then clear
        setTimeout(() => dispatch({
            type: "CLEAR_ALERT",
            payload: {
                message,
                clear: true,
            }}), 3400);
    }

    return (
        <alertsContext.Provider 
            value={{
                alert: state,
                setAlert,
            }}
        >
            {props.children}
        </alertsContext.Provider>
    );
};

export default AlertState;