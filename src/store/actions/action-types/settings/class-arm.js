import { classArmConstants } from '../../../../constants';

const {
    GET_CLASSARM_REQUESTING,
    GET_CLASSARM_SUCCESS,
    GET_CLASSARM_FAIL,

    GET_CLASSARM_ARM_REQUESTING,
    GET_CLASSARM_ARM_SUCCESS,
    GET_CLASSARM_ARM_FAIL,

    GET_CLASSARM_CLASS_REQUESTING,
    GET_CLASSARM_CLASS_SUCCESS,
    GET_CLASSARM_CLASS_FAIL,

    ADD_CLASSARM_REQUESTING,
    ADD_CLASSARM_SUCCESS,
    ADD_CLASSARM_FAIL,

    EDIT_CLASSARM_REQUESTING,
    EDIT_CLASSARM_SUCCESS,
    EDIT_CLASSARM_FAIL,

    DELETE_CLASSARM_REQUESTING,
    DELETE_CLASSARM_SUCCESS,
    DELETE_CLASSARM_FAIL,

    CLEAR_ERRORS

} = classArmConstants;

export const getClassArmRequesting = () => {
    return dispatch => {
        dispatch({
            type: GET_CLASSARM_REQUESTING
        });
    }
}

export const getClassArmSuccess = (classArm, arm, classes) => {
    return dispatch => {
        dispatch({
            type: GET_CLASSARM_SUCCESS,
            classArm: classArm,
            arm: arm,
            classes: classes
        });
    }
}

export const getClassArmFail = message => {
    return dispatch => {
        dispatch({
            type: GET_CLASSARM_FAIL,
            error: message
        });
    }
}

export const getClassArm_Arm_Requesting = () => {
    return dispatch => {
        dispatch({
            type: GET_CLASSARM_ARM_REQUESTING
        });
    }
}

export const getClassArm_Arm_Success = arm => {
    return dispatch => {
        dispatch({
            type: GET_CLASSARM_ARM_SUCCESS,
            arm: arm
        });
    }
}


export const addClassArmRequesting = () => {
    return dispatch => {
        dispatch({
            type: ADD_CLASSARM_REQUESTING
        });
    }
}

export const addClassArmSuccess = () => {
    return dispatch => {
        dispatch({
            type: ADD_CLASSARM_SUCCESS
        });
    }
}

export const addClassArmFail = message => {
    return dispatch => {
        dispatch({
            type: ADD_CLASSARM_FAIL,
            error: message
        });
    }
}

export const editClassArmRequesting = () => {
    return dispatch => {
        dispatch({
            type: EDIT_CLASSARM_REQUESTING
        });
    }
}

export const editClassArmSuccess = () => {
    return dispatch => {
        dispatch({
            type: EDIT_CLASSARM_SUCCESS
        });
    }
}

export const editClassArmFail = message => {
    return dispatch => {
        dispatch({
            type: EDIT_CLASSARM_FAIL,
            error: message
        });
    }
}

export const deleteClassArmRequesting = () => {
    return dispatch => {
        dispatch({
            type: DELETE_CLASSARM_REQUESTING
        });
    }
}

export const deleteClassArmSuccess = () => {
    return dispatch => {
        dispatch({
            type: DELETE_CLASSARM_SUCCESS
        });
    }
}

export const deleteClassArmFail = message => {
    return dispatch => {
        dispatch({
            type: DELETE_CLASSARM_FAIL,
            error: message
        });
    }
}

export const clearClassArmErrors = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ERRORS });
    }
}