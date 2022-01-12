import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Toolbar from '../Navigation/Toolbar/Toolbar';

function Layout(props) {


  const authReducer = useSelector(state => state.authReducer);

  const pathname = props.location?.pathname;

  const pathsWithNoToolbar = [
    '/onboarding',
    '/onboarding/'
  ];

  return (
    <React.Fragment>
      {authReducer?.accessToken && !pathsWithNoToolbar.includes(pathname) ? <Toolbar /> : ''}
      <main className={authReducer?.accessToken && !pathsWithNoToolbar.includes(pathname) ? 'main-container' : ''}>
        {props.children}
      </main>
    </React.Fragment>
  )
}

export default withRouter(Layout);