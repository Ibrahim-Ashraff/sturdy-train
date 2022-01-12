import { signupConstants } from '../../../constants';

const {
  SIGN_UP_INITIATION_SUCCESS,
  SIGN_UP_INITIATION_FAIL,

  SIGN_UP_RESET,


} = signupConstants;

const initialState = {
  error: "",
  success: false,
  user: null,
  message: {},
}

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_INITIATION_SUCCESS:
      return {
        success: true,
        message: action.message
      }
    case SIGN_UP_INITIATION_FAIL:
      return {
        error: action.error,
        // message: action.message,
      }


    case SIGN_UP_RESET:
      return initialState
    default:
      return state;
  }
}

export default signupReducer;