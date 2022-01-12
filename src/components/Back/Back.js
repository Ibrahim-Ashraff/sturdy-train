import React from 'react';
import { useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const GoBack = ({ title, url }) => {
  const history = useHistory();
  return <div className="go-back" onClick={() => history.push(url)}>
    <BiArrowBack />
    <span>{title}</span>
  </div>;
}

export default GoBack;