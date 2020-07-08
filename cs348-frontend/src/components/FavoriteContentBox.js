import React, { useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { getUserState, getUserFavourites } from '../redux/selectors'
import { setFavourites } from "../redux/actions";
import { connect } from "react-redux";

const mapStateToProps = state => {
    const userId = getUserState(state);
    const favourites = getUserFavourites(state);
    return { userId, favourites };
};

const FavoriteContentBox = ({handleClick, userId, favourites, setFavourites}) => {
    useEffect(() => {
        async function fetchData() {
            // const response = await fetch(process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL: 'http://localhost:8080/'+ "api/recipes");          
            const response = await fetch(process.env.REACT_APP_API_URL + "api/favourites/" + userId, {method: 'GET'});
            let results = await response.json();
            setFavourites(results);
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
            <div className="section-body favourites-content-body">
                <div className="results-container">
                    {favourites.map(e => <RecipeCard key={e.recipeId} recipe={e} handleClick={handleClick}></RecipeCard>)}
                </div>
            </div>
        </div>
      );
}

export default connect(mapStateToProps, { setFavourites })(FavoriteContentBox)