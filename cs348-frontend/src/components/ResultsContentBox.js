import React from 'react';
import { connect } from "react-redux";
import RecipeCard from './RecipeCard';
import { getResultsState } from '../redux/selectors'
import { setResultsOrder } from "../redux/actions";

const mapStateToProps = state => {
    const results = getResultsState(state);
    return { results };
};

const getIsEmpty = (results) => {
    return results && results.isEmpty ? <div className="results-message"> No search results, showing all results </div> : null;
}

const ResultsContentBox = ({results, handleClick, setResultsOrder}) => {
    const updateOrder = (e) => {
        setResultsOrder(e.target.value, 1);
    }
    return (
        <div className="section section-fill-height">
            <div className="section-title">
                <div className="section-title-text">
                    Search Results
                    <select onChange={updateOrder} className="form-control form-control-lg results-order-control">
                        <option>Closest Match </option>
                        <option>Difficulty</option>
                        <option>Cook Time</option>
                    </select>
                    <div className="results-order-control-tag">
                        Order by:
                    </div>                    
                </div>
                <form>
                    
                </form>
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

export default connect(mapStateToProps, {setResultsOrder})(ResultsContentBox);