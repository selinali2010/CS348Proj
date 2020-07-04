import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

const FavoriteContentBox = () => {
    const [favResults, setFavResults] = useState([]);
    async function fetchData() {
        //console.log(JSON.stringify(searchParams));
        // const response = await fetch(process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL: 'http://localhost:8080/'+ "api/recipes");          
        const response = await fetch(process.env.REACT_APP_API_URL+"api/recipes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //fetch(process.env.REACT_APP_API_URL + "api/recipes");
        let results = await response.json();
        setFavResults(results);
        
    }
    fetchData();

    return (        
        <div className="favorites-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    My Saved Recipes
                </div>
            </div>
            <div className="section-body favorites-content-body">
                <div className="results-container">
                    {favResults.map(e => <RecipeCard key={e.recipeId} recipe={e}></RecipeCard>)}
                </div>
            </div>
        </div>
      );
}

export default FavoriteContentBox;