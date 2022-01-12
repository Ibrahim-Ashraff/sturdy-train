import { termConstants } from '../../../../constants';

const {
    GET_TERMS_REQUESTING,
    GET_TERMS_SUCCESS,
    GET_TERMS_FAIL,

    ADD_TERMS_REQUESTING,
    ADD_TERMS_SUCCESS,
    ADD_TERMS_FAIL,

    EDIT_TERMS_REQUESTING,
    EDIT_TERMS_SUCCESS,
    EDIT_TERMS_FAIL,

    DELETE_TERMS_REQUESTING,
    DELETE_TERMS_SUCCESS,
    DELETE_TERMS_FAIL,

    CLEAR_ERRORS

} = termConstants;

export const getTermsRequesting = () => {
    return dispatch => {
        dispatch({
            type: GET_TERMS_REQUESTING
        });
    }
}

export const getTermsSuccess = terms => {
    return dispatch => {
        dispatch({
            type: GET_TERMS_SUCCESS,
            terms: terms
        });
    }
}

export const getTermsFail = message => {
    return dispatch => {
        dispatch({
            type: GET_TERMS_FAIL,
            error: message
        });
    }
}

export const addTermRequesting = () => {
    return dispatch => {
        dispatch({
            type: ADD_TERMS_REQUESTING
        });
    }
}

export const addTermSuccess = () => {
    return dispatch => {
        dispatch({
            type: ADD_TERMS_SUCCESS
        });
    }
}

export const addTermFail = message => {
    return dispatch => {
        dispatch({
            type: ADD_TERMS_FAIL,
            error: message
        });
    }
}

export const editTermRequesting = () => {
    return dispatch => {
        dispatch({
            type: EDIT_TERMS_REQUESTING
        });
    }
}

export const editTermSuccess = () => {
    return dispatch => {
        dispatch({
            type: EDIT_TERMS_SUCCESS
        });
    }
}

export const editTermFail = message => {
    return dispatch => {
        dispatch({
            type: EDIT_TERMS_FAIL,
            error: message
        });
    }
}

export const deleteTermRequesting = () => {
    return dispatch => {
        dispatch({
            type: DELETE_TERMS_REQUESTING
        });
    }
}

export const deleteTermSuccess = () => {
    return dispatch => {
        dispatch({
            type: DELETE_TERMS_SUCCESS
        });
    }
}

export const deleteTermFail = message => {
    return dispatch => {
        dispatch({
            type: DELETE_TERMS_FAIL,
            error: message
        });
    }
}

export const clearTermErrors = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ERRORS });
    }
}