import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store";
import App from "./App";

axios.defaults.baseURL = "https://abdul-cert-ver-sys-api.herokuapp.com";

axios.interceptors.request.use(
  (request) => {
    //console.log(`Axios global reuqest: ${JSON.stringify(request)}`);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    //console.log(`Axios global response: ${JSON.stringify(response)}`);
    return response;
  },
  (error) => {
    //console.log(`Error response: ${JSON.stringify(error.response)}`);
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
