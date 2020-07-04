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
      <div className="App">
        <div className="App-background container-fluid row">
          <div className="col-3">
              <LeftColLayout />
          </div>
          <div className="col-9">
              <RightColLayout />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
