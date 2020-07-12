import React from 'react';
import { connect } from "react-redux";
import RecipeCard from './RecipeCard';
import { getResultsState } from '../redux/selectors'

const mapStateToProps = state => {
    const results = getResultsState(state);
    return { results };
};

const getIsEmpty = (results) => {
    return results && results.isEmpty ? <div className="results-message"> No search results, showing all results </div> : null;
}

const ResultsContentBox = ({results, handleClick}) => {
    return (
        <div className="section section-fill-height">
            <div className="section-title">
                <div className="section-title-text">
                    Search Results
                </div>
            </div>
            <div className="section-body">
                { getIsEmpty(results) }
                <div className="results-container">
                    { results.recipes && results.recipes.map(e => <RecipeCard key={e.recipeId} recipe={e} handleClick={handleClick}></RecipeCard>) }
                </div>
            </div>
        </div>
      );
}

export default connect(mapStateToProps)(ResultsContentBox);