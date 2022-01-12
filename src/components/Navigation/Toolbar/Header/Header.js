import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import utils from "../../../../utils";
import Auth from "../../../../components/Auth/Auth";

const Header = (props) => {

  //Redux


  // State
  const [showMenu, setShowMenu] = useState(false);

  // Variables
  const name = Auth().user.username;

  const truncatedName = utils.truncateStr(name, 15);
  const userSubMenuActive = showMenu ? "submenu active" : "submenu";

  // Functions
  const toggleUserMenu = () => {
    setShowMenu(!showMenu);
  };



  const initials = (name) => {
    const nameArr = name.split(" ");
    return nameArr[0].slice(0, 1) + nameArr[1].slice(0, 1);
  };

  return (
    <header className="header" key={props.pageTitle}>
      <div onClick={props.onClick} className="header-hamburger">
        <AiOutlineMenu />
      </div>
      <div className="header-title">
        <h1>{props.pageTitle}</h1>
      </div>
      <div className="user-widget">
        <div className="user-profile" onClick={toggleUserMenu}>
          <div className="header-initials"
            style={{ backgroundColor: "#69B578", color: "#181D27" }}
          >
            {initials(name)}
          </div>

          <p className="user-profile-name">
            {truncatedName}{" "}
            <span>
              <IoIosArrowDown />
            </span>
          </p>

          <div className={userSubMenuActive}>
            <ul className="submenu-list">
              <li>
                <Link to="/logout">Log out</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;
