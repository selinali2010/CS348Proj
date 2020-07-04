import React from 'react';
import Title from './components/Title';
import SearchContentBox from './components/SearchContentBox';
import RightColLayout from './components/RightColLayout';

import { Provider } from "react-redux";
import store from "./redux/store";

import './App.css';
require('dotenv').config();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-background container-fluid">
          <div className = "row full-height">
            <div className="col-3">
              <div className = "left-col">
                <Title />
                <SearchContentBox />
              </div>
              </div>
              <div className="col-9">
                <RightColLayout />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
