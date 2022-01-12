import React from "react";
import { NavLink } from "react-router-dom";

const SubHeader = (props) => {
  if (props.show === true) {
    return (
      <div className="sub-header">
        <ul>
          {props.links.links.map((el, i) => (
            <li key={i}>
              <NavLink exact to={el.href}>
                {el.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default SubHeader;
