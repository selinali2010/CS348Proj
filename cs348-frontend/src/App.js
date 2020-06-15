import React from 'react';
import Title from './Title';
import SearchContentBox from './SearchContentBox';
import UserContentBox from './UserContentBox';
import ResultsContentBox from './ResultsContentBox';
import './App.css';
require('dotenv').config();

function App() {
  return (
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
              <div className="right-col">
              <UserContentBox />
              <ResultsContentBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
