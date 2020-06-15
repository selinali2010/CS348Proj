import React, { useState, useEffect } from 'react';

const ResultsContentBox = () => {
    let allRecipes;
    let counter = 0;
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
        <div className="results-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    Search Results
                </div>
            </div>
            <div className="section-body results-content-body">
              <button onClick={fetchRecipes}> Send me a Recipe! </button>
              { showRecipe() }
            </div>
        </div>
      );
}

export default ResultsContentBox;