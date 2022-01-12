import { armConstants } from '../../../constants';

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

const initialState = {
    getArmRequesting: false,
    getArmError: null,
    arm: [],

    addArmRequesting: false,
    addArmSuccess: null,
    addArmError: null,

    editArmRequesting: false,
    editArmSuccess: null,
    editArmError: null,

    deleteArmRequesting: false,
    deleteArmSuccess: null,
    deleteArmError: null,


}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ARM_REQUESTING:
            return {
                getArmRequesting: true
            }
        case GET_ARM_SUCCESS:
            return {
                getArmRequesting: false,
                arm: action.arm
            }
        case GET_ARM_FAIL:
            return {
                getArmRequesting: false,
                getArmError: action.error
            }
        case ADD_ARM_REQUESTING:
            return {
                ...state,
                addArmRequesting: true
            }
        case ADD_ARM_SUCCESS:
            return {
                ...state,
                addArmRequesting: false,
                addArmSuccess: true
            }
        case ADD_ARM_FAIL:
            return {
                addArmRequesting: false,
                addArmError: action.error
            }
        case EDIT_ARM_REQUESTING:
            return {
                ...state,
                editArmRequesting: true
            }
        case EDIT_ARM_SUCCESS:
            return {
                ...state,
                editArmRequesting: false,
                editArmSuccess: true
            }
        case EDIT_ARM_FAIL:
            return {
                editArmRequesting: false,
                editArmError: action.error
            }
        case DELETE_ARM_REQUESTING:
            return {
                ...state,
                deleteArmRequesting: true
            }
        case DELETE_ARM_SUCCESS:
            return {
                ...state,
                deleteArmRequesting: false,
                deleteArmSuccess: true
            }
        case DELETE_ARM_FAIL:
            return {
                deleteArmRequesting: false,
                deleteArmError: action.error
            }
        case CLEAR_ERRORS:
            return {
                addArmError: null
            }
        default:
            return state;
    }
}