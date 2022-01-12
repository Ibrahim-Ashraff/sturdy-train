import React from "react";
import {
  AiOutlineLeft,
} from "react-icons/ai";
import NavigationItems from "../../NavigationItems/NavigationItems";


const LeftNav = (props) => {
  const navClasses = ["left-nav"];
  if (props.isNavOpen) {
    navClasses.push("open");
  }

  return (
    <div className={navClasses.join(" ")}>

      <div className="closeNav" onClick={props.openNavHandler}>
        <AiOutlineLeft />
      </div>
      <NavigationItems />
    </div>
  );
};

export default LeftNav;
