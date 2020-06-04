import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
require('dotenv').config();

let allRecipes;
let counter = 0;

const Http = new XMLHttpRequest();
Http.open("GET", process.env.REACT_APP_API_URL + "api/recipes");
Http.send();    
Http.onreadystatechange= (e) => {
  allRecipes = Http.responseText.split(')');
}

function App() {
  const [displayRecipe, setDisplayRecipe] = useState([]);
  const fetchRecipes = () => {
    console.log(counter + " " + allRecipes[counter]);
    setDisplayRecipe(allRecipes[counter++]);
    counter %= 4;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Mood Food!
        </p>
        <button onClick={fetchRecipes}> Send me a Recipe! </button>
        <p> {displayRecipe} </p>
      </header>
    </div>
  );
}

export default App;
