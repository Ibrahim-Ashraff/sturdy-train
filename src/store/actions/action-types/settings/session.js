import { sessionConstants } from '../../../../constants';

const {
    GET_SESSION_REQUESTING,
    GET_SESSION_SUCCESS,
    GET_SESSION_FAIL,

    ADD_SESSION_REQUESTING,
    ADD_SESSION_SUCCESS,
    ADD_SESSION_FAIL,

    EDIT_SESSION_REQUESTING,
    EDIT_SESSION_SUCCESS,
    EDIT_SESSION_FAIL,

    DELETE_SESSION_REQUESTING,
    DELETE_SESSION_SUCCESS,
    DELETE_SESSION_FAIL,

    CLEAR_ERRORS

} = sessionConstants;

export const getSessionRequesting = () => {
    return dispatch => {
        dispatch({
            type: GET_SESSION_REQUESTING
        });
    }
}

export const getSessionSuccess = session => {
    return dispatch => {
        dispatch({
            type: GET_SESSION_SUCCESS,
            session: session
        });
    }
}

export const getSessionFail = message => {
    return dispatch => {
        dispatch({
            type: GET_SESSION_FAIL,
            error: message
        });
    }
}

export const addSessionRequesting = () => {
    return dispatch => {
        dispatch({
            type: ADD_SESSION_REQUESTING
        });
    }
}

export const addSessionSuccess = () => {
    return dispatch => {
        dispatch({
            type: ADD_SESSION_SUCCESS
        });
    }
}

export const addSessionFail = message => {
    return dispatch => {
        dispatch({
            type: ADD_SESSION_FAIL,
            error: message
        });
    }
}

export const editSessionRequesting = () => {
    return dispatch => {
        dispatch({
            type: EDIT_SESSION_REQUESTING
        });
    }
}

export const editSessionSuccess = () => {
    return dispatch => {
        dispatch({
            type: EDIT_SESSION_SUCCESS
        });
    }
}

export const editSessionFail = message => {
    return dispatch => {
        dispatch({
            type: EDIT_SESSION_FAIL,
            error: message
        });
    }
}

export const deleteSessionRequesting = () => {
    return dispatch => {
        dispatch({
            type: DELETE_SESSION_REQUESTING
        });
    }
}

export const deleteSessionSuccess = () => {
    return dispatch => {
        dispatch({
            type: DELETE_SESSION_SUCCESS
        });
    }
}

export const deleteSessionFail = message => {
    return dispatch => {
        dispatch({
            type: DELETE_SESSION_FAIL,
            error: message
        });
    }
}

export const clearSessionErrors = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ERRORS });
    }
}