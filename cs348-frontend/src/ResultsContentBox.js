import React, { useState, useEffect } from 'react';

const ResultsContentBox = () => {
    let allRecipes;
    let counter = 0;
    const [displayRecipe, setDisplayRecipe] = useState([]);

    useEffect(async ()  => {
        // const response = await fetch(process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:8080/'+ "api/recipes")
        const response = await fetch(process.env.REACT_APP_API_URL + "api/recipes")
        const data = await response.json();
        allRecipes = data;
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
        console.log(displayRecipe[i]);
        view.push(<li key={i} type>{i + ": " + displayRecipe[i]}</li>);
        }
        return view;
    }

    return (        
        <div className="results-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    Search
                </div>
            </div>
            <div className="section-body results-content-body">
                This is where the search results will go.
              <button onClick={fetchRecipes}> Send me a Recipe! </button>
              { showRecipe() }
            </div>
        </div>
      );
}

export default ResultsContentBox;