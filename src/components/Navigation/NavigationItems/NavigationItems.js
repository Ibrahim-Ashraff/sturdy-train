import React from "react";
import { useSelector } from "react-redux";
import { FiUsers, } from "react-icons/fi";
import { RiDashboardLine, RiFileEditLine } from "react-icons/ri";

import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  let navList = null;

  let isAuthenticated = useSelector((state) => state.authReducer);
  let user = isAuthenticated?.user;
  let role = user?.roles;



  if (role === "admin") {
    navList = (
      <ul className="left-nav-list">
        <NavigationItem link="/app/admin-dashboard">
          <RiDashboardLine />
          Dashboard
        </NavigationItem>
        <NavigationItem link="/app/students">
          <FiUsers />
          Students
        </NavigationItem>

      </ul>
    );


    if (role === "student") {
      navList = (
        <ul className="left-nav-list">
          <NavigationItem link="/app/student-dashboard">
            <RiDashboardLine />
            Dashboard
          </NavigationItem>
          <NavigationItem link="/app/student-result">
            <RiFileEditLine />
            My results
          </NavigationItem>

        </ul>
      );
    }

  }

  return navList;
};

export default NavigationItems;
