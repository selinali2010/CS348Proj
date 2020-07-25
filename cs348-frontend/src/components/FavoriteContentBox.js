/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { getUserState, getUserFavourites } from '../redux/selectors'
import { setFavourites, setFavouritesFilter } from "../redux/actions";
import { connect } from "react-redux";

const mapStateToProps = state => {
    const userId = getUserState(state);
    const favourites = getUserFavourites(state);
    return { userId, favourites };
};

const FavoriteContentBox = ({handleClick, userId, favourites, setFavourites, setFavouritesFilter}) => {
    const [filterMood, setFilterMood] = useState(1);

    useEffect(() => {
        async function fetchData() {
            // const response = await fetch(process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL: 'http://localhost:8080/'+ "api/recipes");          
            const response = await fetch(process.env.REACT_APP_API_URL + "api/favourites/userId=" + userId + "&mood=" + filterMood, {method: 'GET'});
            let results = await response.json();
            setFavourites(results);
        }
        fetchData();
      }, [userId, setFavourites, filterMood]);

    const handleMoodFilterChange = (e) => {
        setFilterMood(e.target.value);
        setFavouritesFilter(parseInt(e.target.value));
    }

    return (        
        <div className="section">
            <div className="section-title">
                <div className="section-title-text">
                    My Saved Recipes
                    <select onChange={handleMoodFilterChange} className="form-control form-control-lg reacts-order-control">
                        <option value={1}> 😍 </option>
                        <option value={2}> 🤤 </option>
                        <option value={3}> 👍 </option>
                        <option value={4}> 👎 </option>
                        <option value={5}> 🤮 </option>
                        <option value={6}> ☠️ </option>
                    </select>
                    <div className="results-order-control-tag">
                        Filter by:
                    </div> 
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

export default connect(mapStateToProps, { setFavourites, setFavouritesFilter })(FavoriteContentBox)