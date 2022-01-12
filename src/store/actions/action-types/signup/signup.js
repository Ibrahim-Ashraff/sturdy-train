import { signupConstants } from '../../../../constants';

const {
  SIGN_UP_INITIATION_SUCCESS,
  SIGN_UP_INITIATION_FAIL,

  SIGN_UP_RESET,
  SIGN_UP_RESET_ERRORS

} = signupConstants;

export const signupInitiationSuccess = message => {
  return {
    type: SIGN_UP_INITIATION_SUCCESS,
    message: message
  }
}

export const signupInitiationFail = (error) => {
  return {
    type: SIGN_UP_INITIATION_FAIL,
    error: error,
    // message: message,

  }
}


export const signupReset = () => {
  return {
    type: SIGN_UP_RESET
  }
}

export const signupResetErrors = () => {
  return {
    type: SIGN_UP_RESET_ERRORS
  }
}