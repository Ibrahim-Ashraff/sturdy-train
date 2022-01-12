import { classRoomConstants } from '../../../../constants';

const {
    GET_CLASSROOM_REQUESTING,
    GET_CLASSROOM_SUCCESS,
    GET_CLASSROOM_FAIL,

    GET_A_CLASSROOM_REQUESTING,
    GET_A_CLASSROOM_SUCCESS,
    GET_A_CLASSROOM_FAIL,

    ADD_CLASSROOM_REQUESTING,
    ADD_CLASSROOM_SUCCESS,
    ADD_CLASSROOM_FAIL,

    EDIT_CLASSROOM_REQUESTING,
    EDIT_CLASSROOM_SUCCESS,
    EDIT_CLASSROOM_FAIL,

    DELETE_CLASSROOM_REQUESTING,
    DELETE_CLASSROOM_SUCCESS,
    DELETE_CLASSROOM_FAIL,

    CLEAR_ERRORS

} = classRoomConstants;

export const getClassRoomRequesting = () => {
    return dispatch => {
        dispatch({
            type: GET_CLASSROOM_REQUESTING
        });
    }
}

export const getAClassRoomRequesting = () => {
    return dispatch => {
        dispatch({
            type: GET_A_CLASSROOM_REQUESTING
        });
    }
}


export const getClassRoomSuccess = (classRoom, classArm, session, pagination) => {
    return dispatch => {
        dispatch({
            type: GET_CLASSROOM_SUCCESS,
            classArm: classArm,
            classRoom: classRoom,
            session: session,
            pagination: pagination,
        });
    }
}

export const getAClassRoomSuccess = (classRoom) => {
    return dispatch => {
        dispatch({
            type: GET_A_CLASSROOM_SUCCESS,
            classRoom: classRoom,
        });
    }
}

export const getClassRoomFail = message => {
    return dispatch => {
        dispatch({
            type: GET_CLASSROOM_FAIL,
            error: message
        });
    }
}

export const getAClassRoomFail = message => {
    return dispatch => {
        dispatch({
            type: GET_A_CLASSROOM_FAIL,
            error: message
        });
    }
}

export const addClassRoomRequesting = () => {
    return dispatch => {
        dispatch({
            type: ADD_CLASSROOM_REQUESTING
        });
    }
}

export const addClassRoomSuccess = () => {
    return dispatch => {
        dispatch({
            type: ADD_CLASSROOM_SUCCESS
        });
    }
}

export const addClassRoomFail = message => {
    return dispatch => {
        dispatch({
            type: ADD_CLASSROOM_FAIL,
            error: message
        });
    }
}

export const editClassRoomRequesting = () => {
    return dispatch => {
        dispatch({
            type: EDIT_CLASSROOM_REQUESTING
        });
    }
}

export const editClassRoomSuccess = () => {
    return dispatch => {
        dispatch({
            type: EDIT_CLASSROOM_SUCCESS
        });
    }
}

export const editClassRoomFail = message => {
    return dispatch => {
        dispatch({
            type: EDIT_CLASSROOM_FAIL,
            error: message
        });
    }
}

export const deleteClassRoomRequesting = () => {
    return dispatch => {
        dispatch({
            type: DELETE_CLASSROOM_REQUESTING
        });
    }
}

export const deleteClassRoomSuccess = () => {
    return dispatch => {
        dispatch({
            type: DELETE_CLASSROOM_SUCCESS
        });
    }
}

export const deleteClassRoomFail = message => {
    return dispatch => {
        dispatch({
            type: DELETE_CLASSROOM_FAIL,
            error: message
        });
    }
}

export const clearClassRoomErrors = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ERRORS });
    }
}