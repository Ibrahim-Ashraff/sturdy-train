import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { authContants } from '../../../../constants';
import authReducer, { initialState } from '../auth';
import { authStart, authError, authenticate } from '../../../actions/action-types/auth/auth';
import { adminPayload } from '../payload';

const {
  AUTH_START,
  AUTHENTICATE,
  AUTH_ERROR
} = authContants;

const mockStore = configureMockStore([thunk]);

describe('auth actions', () => {

  const store = mockStore({
    authReducer: { ...initialState },
  });

  beforeEach(() => {
    store.clearActions();
  });

  it('should set isRequesting to true', () => {
    const expectedAction = { type: AUTH_START };
    const action = authStart();
    const newState = authReducer(initialState, action);
    expect(newState.isRequesting).toEqual(true);
    expect(action.type).toEqual(expectedAction.type);
  });

  it('should successfully authenticate user upon success', () => {
    const payload = { token: adminPayload.token, user: adminPayload.user };
    const expectedAction = { type: AUTHENTICATE, payload };
    const action = authenticate(payload.token, payload.user);
    const newState = authReducer(initialState, action);
    expect(action.type).toEqual(expectedAction.type);
    expect(newState.isRequesting).toEqual(false);
    expect(newState.success).toEqual(true);
    expect(newState.accessToken).toEqual(payload.token.accessToken);
    expect(newState.refreshToken).toEqual(payload.token.refreshToken);
    expect(expect.objectContaining(newState.user)).toEqual(expect.objectContaining(payload.user));
  });

  it('should show error', () => {
    const expectedAction = { type: AUTH_ERROR };
    const action = authError();
    const newState = authReducer(initialState, action);
    expect(action.type).toEqual(expectedAction.type);
    expect(newState.error).toEqual(true);
    expect(newState.isRequesting).toEqual(false);
    expect(newState.message).toEqual(action.message);
  });
});