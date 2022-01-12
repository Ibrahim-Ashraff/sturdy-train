import React from "react";
import { NavLink } from "react-router-dom";

import logoImg from "../../assets/images/OXYMATT LOGO A.png";
import navLogo from "../../assets/images/oxymatt_logo_without_tagline.png";

const Logo = (props) => {
  let img = props.isNav ? navLogo : logoImg;


  return (
    <NavLink to="/">
      <div className="logo">
        <img src={img} alt="Microbridge Logo" />
      </div>
    </NavLink>
  );
};

export default Logo;
