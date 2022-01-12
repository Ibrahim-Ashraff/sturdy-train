import React from 'react';
import { ToastContainer } from 'react-toastify';

const Toast = props => {
  return <ToastContainer
    className="toast-content"
    position="top-right"
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
}

export default Toast;