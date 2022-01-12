import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom"
import { Redirect } from "react-router";
// Auth
import Login from "../../src/pages/Auth/Login/Login";
import Logout from "../../src/pages/Auth/Logout/Logout";
import SignUp from "../../src/pages/Auth/SignUp/SignUp";


import NotFound from "../../src/pages/NotFound/NotFound";
import Students from "../pages/App/Students/Students";
// // Dashboards
import AdminDashboard from "../../src/pages/App/Dashboard/Admin";

import StudentDashboard from "../../src/pages/App/Dashboard/Students";

function RedirectHome(props) {
  return <Redirect to="/login" />;
}

const Routes = (props) => {
  let isAuthenticated = useSelector((state) => state.authReducer);
  let accessToken = isAuthenticated?.accessToken;
  let user = isAuthenticated?.user;
  let role = user?.roles;

  let routes = (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/verify" component={SignUp} />

      <RedirectHome />
    </Switch>
  );

  if (accessToken) {
    if (role === "admin") {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route exact path="/app/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/app/students" component={Students} />

          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      );
    }

    if (role === "student") {
      routes = (
        <Switch>
          <Route
            exact
            path="/app/student-dashboard/"
            component={StudentDashboard}
          />
          <Route exact path="/logout" component={Logout} />

          <Redirect to="/not-found" />
        </Switch>
      );
    }

  }

  return routes;
};

export default Routes;
