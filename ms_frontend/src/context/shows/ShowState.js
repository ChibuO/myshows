import {useReducer} from 'react';
import ShowsContext from './ShowsContext';
import ShowsReducer from './ShowsReducer';

const ShowState = (props) => {
    const initialState = {
        shows: [{}],
        platforms: [],
        newShow: {},
        newPlatform: {},
        selectedShow: {},
        sortMethod: "Default",
        filterMethod: "None",
    }

    const [state, dispatch] = useReducer(ShowsReducer, initialState);

    const getShows = async () => {
        //wait for response before doing anything, don't want a promise
        const response = await fetch('/api/shows/')
        const data = await response.json()
        
        dispatch({
            type: "GET_ALL_SHOWS",
            payload: sortShows(data.reverse(), state.sortMethod),
        });
    };

    const getSorted = (method) => {
        dispatch({
            type: "SORT_SHOWS",
            payload: sortShows([...state.shows], method),
        });
    }

    const getFiltered = async (method) => {
        const response = await fetch(`/api/filter/?type=${method}`)
        const data = await response.json()

        dispatch({
            type: "FILTER_SHOWS",
            payload: sortShows(data, state.sortMethod),
        });

        dispatch({
            type: "SET_FILTER_METHOD",
            payload: method,
        });
    }

    const sortShows = (data, method) => {
        dispatch({
            type: "SET_SORT_METHOD",
            payload: method,
        });

        let result = [];
        switch(method) {
            case "Default":
            case "Default Reverse":
                result = data.sort(function (x, y) {
                    let a = new Date(x.created);
                    let b = new Date(y.created);
                    return b - a;
                })
                break;
            case "Title":
            case "Title Reverse":
                result = data.sort(function (x, y) {
                    let a = x.name.toUpperCase();
                    let b = y.name.toUpperCase();
                    return a === b ? 0 : a > b ? 1 : -1;
                })
                break;
            case "Platform":
            case "Platform Reverse":
                result = data.sort(function (x, y) {
                    let a = x.platform.toUpperCase();
                    let b = y.platform.toUpperCase();
                    return a === b ? 0 : a > b ? 1 : -1;
                })
                break;
            case "Started":
            case "Started Reverse":
                result = data.sort(function (x, y) {
                    let a = new Date(x.started);
                    let b = new Date(y.started);
                    return a - b;
                })
                break;
            case "Completed":
            case "Completed Reverse":
                result = data.sort(function (x, y) {
                    let a = x.completed;
                    let b = y.completed;
                    if ( a === true && b === false ) return -1;
                    if ( a === false && b === true ) return 1;
                    return 0;
                })
                break;
            default:
                result = data;
        }

        if(method.includes("Reverse")) {
            result.reverse();
        }

        return result;
    }

    const getPlatforms = async () => {
        //wait for response before doing anything, don't want a promise
        const response = await fetch('/api/platforms/')
        const data = await response.json()
        
        dispatch({
            type: "GET_PLATFORMS",
            payload: data.reverse(),
        });
    }

    let createShow = async (show, other) => {
        let finalPlatform = show.platform
        if (show.platform === "Other") {
            finalPlatform = other.trim()
        }
        let json_dict = {
            name: show.title.trim(),
            platform: finalPlatform,
            started: show.started,
            completed: show.completed
        };
        
        fetch('/api/shows/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_dict),
        })

        dispatch({
            type: "ADD_SHOW",
        });

        dispatch({
            type: "SET_SORT_METHOD",
            payload: "Default",
        });

        dispatch({
            type: "SET_FILTER_METHOD",
            payload: "None",
        });

        getShows()
    }

    let createPlatform = async (platform, color) => {
        const json_dict = {
            name: platform,
            color: color
        };
        fetch('/api/platforms/create/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_dict)
        })

        dispatch({
            type: "ADD_PLATFORM",
        });
    }

    let updateShow = async (selectedShow, show_info, other) => {
        let finalPlatform = show_info.platform
        if (show_info.platform === "Other") {
            finalPlatform = other.trim()
        }
        let json_dict = {
            name: show_info.title.trim(),
            platform: finalPlatform,
            started: show_info.started,
            completed: show_info.completed
        };
        fetch(`/api/shows/${selectedShow.id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_dict),
        })

        dispatch({
            type: "UPDATE_SHOW",
        });
    }

    let deleteShow = async (selectedShow) => {
        fetch(`/api/shows/${selectedShow.id}/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })

        dispatch({
            type: "DELETE_SHOW",
        });
    }

    const setSelectedShow = async (show) => {
        dispatch({
            type: "SET_SELECTED",
            payload: show,
        });


    }


    return (
        <ShowsContext.Provider
            value={{
                shows: state.shows,
                platforms: state.platforms,
                selectedShow: state.selectedShow,
                sortMethod: state.sortMethod,
                filterMethod: state.filterMethod,
                getShows, getPlatforms,
                createPlatform, createShow, setSelectedShow,
                updateShow, deleteShow, getSorted, getFiltered,
                }}
        >
            {props.children}
        </ShowsContext.Provider>
    )
}

export default ShowState