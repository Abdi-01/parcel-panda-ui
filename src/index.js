import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import { Reducers } from "./reducers";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

const globalStore = createStore(Reducers, {}, applyMiddleware(ReduxThunk))
ReactDOM.render(
  <Provider store={globalStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
