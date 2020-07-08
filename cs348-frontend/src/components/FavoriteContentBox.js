import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { getUserState } from '../redux/selectors'
import { connect } from "react-redux";

const mapStateToProps = state => {
    const userId = getUserState(state);
    return { userId };
};

const FavoriteContentBox = ({handleClick, userId}) => {
    const [favResults, setFavResults] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // const response = await fetch(process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL: 'http://localhost:8080/'+ "api/recipes");          
            const response = await fetch(process.env.REACT_APP_API_URL + "api/favourites/" + userId, {method: 'GET'});
            let results = await response.json();
            setFavResults(results);
        }
        fetchData();
      }, []);

    return (        
        <div className="section">
            <div className="section-title">
                <div className="section-title-text">
                    My Saved Recipes
                </div>
            </div>
            <div className="section-body favorites-content-body">
                <div className="results-container">
                    {favResults.map(e => <RecipeCard key={e.recipeId} recipe={e} handleClick={handleClick}></RecipeCard>)}
                </div>
            </div>
        </div>
      );
}

export default connect(mapStateToProps)(FavoriteContentBox)