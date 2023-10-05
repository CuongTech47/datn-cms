import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
// import { LoadingProvider } from './contexts/LoginContext.js'
import {Provider} from "react-redux";
import store from "./store.js";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
          <Provider store={store} >
              <App />
          </Provider>
      {/*<LoadingProvider>*/}

      {/*</LoadingProvider>*/}

      </Router>

  </React.StrictMode>,
)
