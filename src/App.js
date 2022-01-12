import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { authCheckState } from './store/actions/action-types';
import Layout from './components/Layout/Layout';
import Routes from './routes';
import './sass/main.scss';
import 'react-toastify/dist/ReactToastify.min.css';


function App() {
  // Dispatch
  const dispatch = useDispatch();

  // History
  const history = useHistory();

  // Reducer
  const authReducer = useSelector(state => state.authReducer);
  const sessionTimeout = authReducer?.sessionTimeout;

  useEffect(() => {

    dispatch(authCheckState());


  }, [dispatch]);

  useEffect(() => {
    if (sessionTimeout) {
      history.push('/login');
    }
  }, [sessionTimeout, history]);
  return (
    <Layout>
      <Routes />
    </Layout>
  );

}

export default App;