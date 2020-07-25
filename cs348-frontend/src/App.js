import React from 'react';
import RightColLayout from './components/RightColLayout';
import LeftColLayout from './components/LeftColLayout';

import { Provider } from "react-redux";
import store from "./redux/store";

import './App.css';

require('dotenv').config();

function App() {
  return (
    <Provider store={store}>
      <div className="App-background">
        <div className="scrolling-window">
          <div className="App container-fluid">
            <div className="row no-gutters full-height">
              <div className="col-md-3">
                  <LeftColLayout />
              </div>
              <div className="col-md-9">
                  <RightColLayout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
