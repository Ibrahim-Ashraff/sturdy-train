import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItem = props => {

  let listItem = <li>
    <NavLink to={props.link}>{props.children}</NavLink>
  </li>;

  return listItem;

}

export default navigationItem;