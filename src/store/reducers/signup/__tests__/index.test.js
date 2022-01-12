import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { signupConstants } from '../../../../constants';
import signupReducer, { initialState } from '../signup';
import { signupInitiationSuccess } from '../../../actions/action-types/signup/signup';

const signupInitiationPayload = {
  message: 'Sign up initialization was successful',
}

const {
  SIGN_UP_INITIATION_SUCCESS
} = signupConstants;

const mockStore = configureMockStore([thunk]);

describe('signup actions', () => {

  const store = mockStore({
    authReducer: { ...initialState },
  });

  beforeEach(() => {
    store.clearActions();
  });

  it('should handle the signup initiation state', () => {
    const expectedAction = { type: SIGN_UP_INITIATION_SUCCESS };
    const action = signupInitiationSuccess(signupInitiationPayload.message);
    const newState = signupReducer(initialState, action);
    expect(action.type).toEqual(expectedAction.type);
    expect(newState.success).toEqual(true);
    expect(newState.message).toEqual(signupInitiationPayload.message);
  });
});