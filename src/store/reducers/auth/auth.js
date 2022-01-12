import { authContants } from '../../../constants';

const {
  AUTHENTICATE,
  AUTH_START,
  AUTH_ERROR,
  AUTH_CLEAR,

  AUTH_TIMEOUT
} = authContants;

const errors = {
  "INTERNAL_SERVER_ERROR": 'Oops! Something went wrong.',
  'We could not verify your credentials. Please check and try again.': 'Invalid Username and/or Password'
}

export const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  message: null,
  error: false,
  success: false,
  isRequesting: false,
  sessionTimeout: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        isRequesting: true
      }
    case AUTHENTICATE:
      return {
        accessToken: action.token.accessToken,
        refreshToken: action.token.refreshToken,
        user: action.user,
        success: true,
        isRequesting: false
      }
    case AUTH_ERROR:
      return {
        message: errors.hasOwnProperty(action.message) ? errors[action.message] : action.message,
        error: true,
        isRequesting: false
      }
    case AUTH_TIMEOUT:
      return {
        sessionTimeout: true
      }
    case AUTH_CLEAR:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;