import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
require('dotenv').config();

let allRecipes;
let counter = 0;

function App() {
  const [displayRecipe, setDisplayRecipe] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL: 'http://localhost:8080/'+ "api/recipes");
      const data = await response.json();
      allRecipes = data;
    }
    fetchData();
  }, []);

  const fetchRecipes = () => {
    setDisplayRecipe(allRecipes[counter++]);
    counter %= allRecipes.length;
  }

  // TODO: Replace this with a component to render a recipe
  const showRecipe = () => {
    if(!displayRecipe){
      return;
    }
    let view = [];
    for(let i in displayRecipe){
      view.push(<li key={i}>{i + ": " + displayRecipe[i]}</li>);
    }
    return view;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Mood Food!
        </p>
        <button onClick={fetchRecipes}> Send me a Recipe! </button>
        { showRecipe() }
      </header>
    </div>
  );
}

export default App;
