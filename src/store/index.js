import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import signupReducer from "./reducers/signup/signup";
import authReducer from "./reducers/auth/auth";

import studentReducer from "./reducers/student/student";

import armReducer from "./reducers/settings/arm";


import adminDashboardReducer from "./reducers/dashboard/adminDashboard";


const rootReducers = combineReducers({
  signupReducer,
  authReducer,
  studentReducer,
  armReducer,
  adminDashboardReducer,

});

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
