import { armConstants } from '../../../../constants';

const {
    GET_ARM_REQUESTING,
    GET_ARM_SUCCESS,
    GET_ARM_FAIL,

    ADD_ARM_REQUESTING,
    ADD_ARM_SUCCESS,
    ADD_ARM_FAIL,

    EDIT_ARM_REQUESTING,
    EDIT_ARM_SUCCESS,
    EDIT_ARM_FAIL,

    DELETE_ARM_REQUESTING,
    DELETE_ARM_SUCCESS,
    DELETE_ARM_FAIL,

    CLEAR_ERRORS

} = armConstants;

export const getArmRequesting = () => {
    return dispatch => {
        dispatch({
            type: GET_ARM_REQUESTING
        });
    }
}

export const getArmSuccess = arm => {
    return dispatch => {
        dispatch({
            type: GET_ARM_SUCCESS,
            arm: arm
        });
    }
}

export const getArmFail = message => {
    return dispatch => {
        dispatch({
            type: GET_ARM_FAIL,
            error: message
        });
    }
}

export const addArmRequesting = () => {
    return dispatch => {
        dispatch({
            type: ADD_ARM_REQUESTING
        });
    }
}

export const addArmSuccess = () => {
    return dispatch => {
        dispatch({
            type: ADD_ARM_SUCCESS
        });
    }
}

export const addArmFail = message => {
    return dispatch => {
        dispatch({
            type: ADD_ARM_FAIL,
            error: message
        });
    }
}

export const editArmRequesting = () => {
    return dispatch => {
        dispatch({
            type: EDIT_ARM_REQUESTING
        });
    }
}

export const editArmSuccess = () => {
    return dispatch => {
        dispatch({
            type: EDIT_ARM_SUCCESS
        });
    }
}

export const editArmFail = message => {
    return dispatch => {
        dispatch({
            type: EDIT_ARM_FAIL,
            error: message
        });
    }
}

export const deleteArmRequesting = () => {
    return dispatch => {
        dispatch({
            type: DELETE_ARM_REQUESTING
        });
    }
}

export const deleteArmSuccess = () => {
    return dispatch => {
        dispatch({
            type: DELETE_ARM_SUCCESS
        });
    }
}

export const deleteArmFail = message => {
    return dispatch => {
        dispatch({
            type: DELETE_ARM_FAIL,
            error: message
        });
    }
}

export const clearArmErrors = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ERRORS });
    }
}