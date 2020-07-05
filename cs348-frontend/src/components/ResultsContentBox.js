import React from 'react';
import { connect } from "react-redux";
import RecipeCard from './RecipeCard';
import { getResultsState } from '../redux/selectors'

const mapStateToProps = state => {
    const results = getResultsState(state);
    return { results };
};

const ResultsContentBox = ({results, handleClick}) => {
    return (        
        <div className="results-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    Search Results
                </div>
            </div>
            <div className="section-body results-content-body">
                <div className="results-container">
                    {results.map(e => <RecipeCard key={e.recipeId} recipe={e} handleClick={handleClick}></RecipeCard>)}
                </div>
            </div>
        </div>
      );
}

export default connect(mapStateToProps)(ResultsContentBox);