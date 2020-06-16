import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const ResultsContentBox = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const response = await fetch(process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL: 'http://localhost:8080/'+ "api/recipes");
        // const response = await fetch(process.env.REACT_APP_API_URL + "api/recipes");
        const data = await response.json();
            setRecipes(data);
        }
        fetchData();
    }, []);

    return (        
        <div className="results-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    Search Results
                </div>
            </div>
            <div className="section-body results-content-body resultsContainer">
              {recipes.map(e => <RecipeCard recipe={e}></RecipeCard>)}
            </div>
        </div>
      );
}

export default ResultsContentBox;